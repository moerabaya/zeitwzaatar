import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../schemas/queries/getProduct";

export const Product = () => {
  const params = useParams();
  const { mode } = useColorScheme();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: params.id },
  });
  if (loading) return `...loading`;
  return (
    <Grid
      container
      minHeight={"100vh"}
      sx={{ backgroundColor: mode === "dark" ? "black" : "primary.50" }}
    >
      <Grid item md={6}>
        <AspectRatio minHeight="100vh">
          <img
            component="img"
            src={"https://source.unsplash.com/random?olive-oil"}
          />
        </AspectRatio>
      </Grid>
      <Grid item md={6} height={"100%"}>
        <Box
          sx={{
            p: 5,
            pt: 8,
            pb: 6,
          }}
        >
          <Typography color="text.primary" gutterBottom level="h1">
            {data?.getProduct?.name}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            maxWidth={"80%"}
            paragraph
          >
            {data?.getProduct?.description}
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2}>
            <Button startDecorator={<AddIcon />} variant="soft" color="neutral">
              Add to cart
            </Button>
            <Button
              startDecorator={<FavoriteBorderIcon />}
              variant="outlined"
              color="neutral"
            >
              Wishlist
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
