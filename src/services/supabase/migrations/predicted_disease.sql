-- adding predicted disease column to symptom_report table

ALTER TABLE symptoms_report ADD COLUMN predicted_disease TEXT;
