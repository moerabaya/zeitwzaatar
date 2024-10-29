import { useMutation, useQuery } from "@apollo/client";
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
import { useSnackbar } from "../context/snackbar";
import { ADD_TO_CART, GET_ALL_CART_ITEMS } from "../schemas/mutations/cart";
import { GET_PRODUCT } from "../schemas/queries/getProduct";

export const Product = () => {
  const params = useParams();
  const { mode } = useColorScheme();
  const [mutation, { loading: cartLoading }] = useMutation(ADD_TO_CART);
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: params.id },
  });
  const { show, showError } = useSnackbar();
  const handleAddToCart = async () => {
    try {
      await mutation({
        variables: {
          id: data.getProduct.id,
          quantity: 1,
        },
        refetchQueries: [GET_ALL_CART_ITEMS],
      });
      show(`${data.getProduct.name} has been added to cart`);
    } catch (error) {
      console.error(error);
      showError(error.message);
    }
  };
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
            src={"https://picsum.photos/seed/picsum/200/300"}
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
            <Button
              startDecorator={<AddIcon />}
              variant="solid"
              onClick={handleAddToCart}
              loading={cartLoading}
              disabled={cartLoading}
            >
              Add to cart
            </Button>
            <Button startDecorator={<FavoriteBorderIcon />} variant="outlined">
              Wishlist
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
