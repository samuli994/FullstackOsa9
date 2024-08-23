import { z } from 'zod';
import { Gender } from '../types';

export const patientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    ssn: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.nativeEnum(Gender, { required_error: 'Gender is required' })
});
  
export type PatientInput = z.infer<typeof patientSchema>;
