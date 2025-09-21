export type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type ChipSize = "small" | "medium";

export interface ChipProps {
  label: string;
  color: ChipColor;
  size: ChipSize;
}