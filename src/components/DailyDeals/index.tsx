import { generateWeightedDiscounts } from "@/helpers";
import { productsService } from "@/services/products";
import type { Product } from "@/types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Card from "../Card";
import "./DailyDeals.scss";

const DailyDeals = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyDeals = async () => {
      try {
        setLoading(true);
        const response = await productsService.getAllProducts();

        const productsWithDiscounts = generateWeightedDiscounts(
          response.products
        );

        const dealsOfTheDay = productsWithDiscounts
          .filter((product) => product.discountPercentage > 10)
          .sort((a, b) => b.discountPercentage - a.discountPercentage)
          .slice(0, 8);

        setDiscountedProducts(dealsOfTheDay);
      } catch (err) {
        setError("Failed to load daily deals. Please try again later.");
        console.error("Error fetching daily deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyDeals();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="daily-deals-container">
      <Box mb={4}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          🔥 Today's discounts
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
        {discountedProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card product={product} shouldShowDiscount />
          </Grid>
        ))}
      </Grid>

      {discountedProducts.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No deals available today.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Come back soon!
          </Typography>
        </Box>
      )}

      {discountedProducts.length > 0 && (
        <Box textAlign="center" mt={4}>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            size="large"
            sx={{ px: 4 }}
          >
            See All Products
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default DailyDeals;
