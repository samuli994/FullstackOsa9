import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import { Patient } from "../types";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients }: Props) => {
  return (
    <List>
      {patients.map(patient => (
        <ListItem key={patient.id} button component={Link} to={`/patients/${patient.id}`}>
          <ListItemText primary={patient.name} secondary={patient.occupation} />
        </ListItem>
      ))}
    </List>
  );
};

export default PatientListPage;
