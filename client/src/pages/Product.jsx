import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = React.useState(null);
  const params = useParams();

  const fetchData = React.useCallback(() => {
    const query = `query($productId: ID!) {
        getProduct(id: $productId) {
					id
          name
          description
        }
      }
    `;
    fetch("/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          productId: params.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from server", data);
        setData(data.data);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
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
