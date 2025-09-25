import { Box, Rating as MUIRating, Typography } from "@mui/material";

const Rating = ({ value }: { value: number }) => (
  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
    <MUIRating value={value} readOnly precision={0.5} />
    <Typography variant="body2" sx={{ ml: 0.5 }}>
      {value}
    </Typography>
  </Box>
);

export default Rating;
