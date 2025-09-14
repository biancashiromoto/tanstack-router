import Typography from "@mui/material/Typography";

interface CardTitleProps {
  title: string;
}

export default function CardTitle({ title }: CardTitleProps) {
  return (
    <Typography
      gutterBottom
      variant="body1"
      component="div"
      sx={{ gridColumn: "span 2", height: 50 }}
    >
      {title}
    </Typography>
  );
}
