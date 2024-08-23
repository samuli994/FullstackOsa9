import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../types";

const HealthRatingIcon: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <HealthAndSafetyIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <HealthAndSafetyIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <HealthAndSafetyIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <HealthAndSafetyIcon style={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <LocalHospitalIcon /> Hospital Entry - {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            {entry.diagnosisCodes && (
              <Typography>Diagnosis Codes: {entry.diagnosisCodes.join(", ")}</Typography>
            )}
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>
              Discharge: {entry.discharge?.date}, Criteria: {entry.discharge?.criteria}
            </Typography>
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <WorkIcon /> Occupational Healthcare Entry - {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            {entry.diagnosisCodes && (
              <Typography>Diagnosis Codes: {entry.diagnosisCodes.join(", ")}</Typography>
            )}
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.sickLeave && (
              <Typography>
                Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            )}
          </CardContent>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <HealthAndSafetyIcon /> Health Check Entry - {entry.date}
            </Typography>
            <Typography>{entry.description}</Typography>
            {entry.diagnosisCodes && (
              <Typography>Diagnosis Codes: {entry.diagnosisCodes.join(", ")}</Typography>
            )}
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Health Check Rating: <HealthRatingIcon rating={entry.healthCheckRating} /></Typography>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

export default EntryDetails;