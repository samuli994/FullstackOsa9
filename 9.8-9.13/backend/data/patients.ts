import { Gender } from '../types';

const patients = [
  {
    id: '1',
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    ssn: '123-45-6789',
    gender: Gender.Male,
    occupation: 'Software Developer'
  },
  {
    id: '2',
    name: 'Jane Smith',
    dateOfBirth: '1985-05-15',
    ssn: '987-65-4321',
    gender: Gender.Female,
    occupation: 'Project Manager'
  }
];

export default patients;
