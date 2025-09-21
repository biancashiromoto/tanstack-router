import { Chip as MUIChip, type ChipProps } from "@mui/material";

const Chip = ({ label, color, size }: ChipProps) => {
  return <MUIChip label={label} color={color} size={size} />;
};

export default Chip;
