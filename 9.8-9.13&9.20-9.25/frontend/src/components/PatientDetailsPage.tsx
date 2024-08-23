import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis } from "../types";
import { Typography, Box } from "@mui/material";
import EntryDetails from "./EntryDetails";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosisData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(diagnosisData);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientDetails();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Box mt={2}>
        <Typography variant="h5">Entries:</Typography>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
