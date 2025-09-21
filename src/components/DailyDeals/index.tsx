import type { Product } from "@/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouteContext, useRouterState } from "@tanstack/react-router";
import Card from "../Card";
import Loader from "../Loader";

const DailyDeals = () => {
  const { dailyDeals } = useRouteContext({ from: "__root__" });
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="daily-deals-container">
      <Box mb={4}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 1,
          }}
        >
          Today's discounts
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Deals with up to 70% off!
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {dailyDeals.map((product: Product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card.Root product={product} shouldShowDiscount>
              <Card.Image />
              <Card.Content></Card.Content>
            </Card.Root>
          </Grid>
        ))}
      </Grid>

      {dailyDeals.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No deals available today.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Come back soon!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default DailyDeals;
