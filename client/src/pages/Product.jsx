import { useQuery } from "@apollo/client";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../schemas/queries/getProduct";

const Product = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: params.id },
  });
  if (loading) return `...loading`;
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            {data?.getProduct?.name ?? "loading..."}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {data?.getProduct?.name ?? "loading..."}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {data?.getProduct?.description ?? "loading..."}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Edit</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  );
};

export default Product;
