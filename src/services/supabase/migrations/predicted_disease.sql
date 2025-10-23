-- adding predicted disease column to symptom_logs table

ALTER TABLE symptom_logs ADD COLUMN predicted_disease TEXT;
