import CardContent from "@mui/material/CardContent";

interface CardBodyProps {
  children: React.ReactNode;
}

export default function CardBody({ children }: CardBodyProps) {
  return (
    <CardContent
      sx={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "auto auto",
      }}
    >
      {children}
    </CardContent>
  );
}
