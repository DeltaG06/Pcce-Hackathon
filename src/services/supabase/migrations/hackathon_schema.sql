
-- USERS / PROFILES
create table public.profiles (
  id uuid primary key default auth.uid(),
  email text unique not null,
  display_name text,
  role text check (role in ('citizen', 'pharmacy', 'admin')) default 'citizen',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Allow user to see only their own profile
create policy "Users can view own profile" on public.profiles
for select using (auth.uid() = id);

-- Allow user to update own profile
create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id);

-- PHARMACIES
create table public.pharmacies (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  address text,
  latitude double precision,
  longitude double precision,
  contact_number text,
  created_at timestamptz default now()
);

alter table public.pharmacies enable row level security;

-- Pharmacy owners can manage their own data
create policy "Pharmacy owners manage own record" on public.pharmacies
for all using (auth.uid() = profile_id);

-- MEDICINES MASTER LIST
create table public.medicines (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  category text,
  created_at timestamptz default now()
);

alter table public.medicines enable row level security;
create policy "All users can read medicines" on public.medicines for select using (true);

-- INVENTORY (Pharmacy-Medicine relationship)
create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  pharmacy_id uuid references public.pharmacies(id) on delete cascade,
  medicine_id uuid references public.medicines(id) on delete cascade,
  quantity int default 0,
  last_updated timestamptz default now(),
  constraint unique_inventory unique (pharmacy_id, medicine_id)
);

alter table public.inventory enable row level security;

-- Pharmacies can only update their own inventory
create policy "Pharmacies manage own inventory"
on public.inventory
for all using (
  auth.uid() in (select profile_id from public.pharmacies where id = inventory.pharmacy_id)
);

-- Everyone can view inventory (availability map)
create policy "Anyone can view inventory"
on public.inventory
for select using (true);

-- SYMPTOM REPORTS (anonymous or linked to user)
create table public.symptom_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  symptom text not null,
  severity text check (severity in ('low','medium','high')) default 'low',
  latitude double precision,
  longitude double precision,
  reported_at timestamptz default now()
);

alter table public.symptom_reports enable row level security;

-- Anonymous insert allowed
create policy "Anyone can report symptoms"
on public.symptom_reports
for insert with check (true);

-- Admins can view all symptom data
create policy "Admins can view all symptom reports"
on public.symptom_reports
for select using (
  exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
);

-- ALERTS / HEALTH NOTIFICATIONS
create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text,
  severity text check (severity in ('info','warning','critical')) default 'info',
  region text,
  created_at timestamptz default now()
);

alter table public.alerts enable row level security;

-- Admins manage alerts
create policy "Admins manage alerts"
on public.alerts
for all using (
  exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
);

-- Anyone can view alerts
create policy "Anyone can view alerts"
on public.alerts
for select using (true);

-- Nearby pharmacies within 5km radius
create or replace function public.get_nearby_pharmacies(
  lat double precision,
  lon double precision,
  radius_km double precision default 5
)
returns table (
  id uuid,
  name text,
  address text,
  latitude double precision,
  longitude double precision,
  distance_km double precision
)
language sql
as $$
  select
    p.id,
    p.name,
    p.address,
    p.latitude,
    p.longitude,
    (
      6371 * acos(
        cos(radians(lat)) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians(lon))
        + sin(radians(lat)) * sin(radians(p.latitude))
      )
    ) as distance_km
  from public.pharmacies p
  where p.latitude is not null
    and p.longitude is not null
    and (
      6371 * acos(
        cos(radians(lat)) * cos(radians(p.latitude)) * cos(radians(p.longitude) - radians(lon))
        + sin(radians(lat)) * sin(radians(p.latitude))
      )
    ) < radius_km
  order by distance_km;
$$;


-- Symptom trend aggregation (for heatmap or analytics)
create or replace function public.aggregate_symptoms()
returns table (
  symptom text,
  report_count bigint
)
language sql
as $$
  select symptom, count(*) as report_count
  from public.symptom_reports
  where reported_at > now() - interval '7 days'
  group by symptom
  order by report_count desc;
$$;

-- INDEXES
create index idx_pharmacies_location on public.pharmacies (latitude, longitude);
create index idx_symptom_reports_location on public.symptom_reports (latitude, longitude);
create index idx_inventory_medicine on public.inventory (medicine_id);

-- SYMPTOM LOGS TABLE (for AI analysis results)
create table public.symptom_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  symptoms text not null,
  disease text not null,
  predicted_disease text,
  location jsonb,
  timestamp timestamptz default now()
);

alter table public.symptom_logs enable row level security;

-- Allow anonymous insert for symptom logs
create policy "Anyone can insert symptom logs"
on public.symptom_logs
for insert with check (true);

-- Allow users to view their own logs
create policy "Users can view own symptom logs"
on public.symptom_logs
for select using (auth.uid() = user_id);

-- Admins can view all logs
create policy "Admins can view all symptom logs"
on public.symptom_logs
for select using (
  exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
);

-- Function to get distinct diseases from symptom logs
create or replace function public.get_distinct_diseases()
returns table (distinct_disease text)
language sql
as $$
  select distinct disease as distinct_disease
  from public.symptom_logs
  where disease is not null
  order by distinct_disease;
$$;

-- ENABLE REALTIME
alter publication supabase_realtime add table public.inventory;
alter publication supabase_realtime add table public.symptom_reports;
alter publication supabase_realtime add table public.symptom_logs;
alter publication supabase_realtime add table public.alerts;
