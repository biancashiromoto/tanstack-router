import { Chip as MUIChip } from "@mui/material";

export interface ChipProps {
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

const Chip = ({ label, color }: ChipProps) => {
  return <MUIChip label={label} color={color} />;
};

export default Chip;
