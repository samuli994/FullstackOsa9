import express from 'express';
import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Patient } from '../types';
import { patientSchema } from '../utils/validation';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsWithoutSsn = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
  res.json(patientsWithoutSsn);
});

router.post('/', (req, res) => {
    const result = patientSchema.safeParse(req.body);
  
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
  
    const newPatientData = result.data;
  
    const newPatient: Patient = {
      id: uuid(),
      ...newPatientData,
      dateOfBirth: newPatientData.dateOfBirth ?? "",
      ssn: newPatientData.ssn ?? "",
    };
  
    patients.push(newPatient);
    return res.status(201).json(newPatient);
  });

export default router;
