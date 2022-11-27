import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Home = () => {
  const [data, setData] = React.useState(null);

  const fetchData = React.useCallback(() => {
    const query = {
      query: `
      {
        getAllProducts {
					id
          name
          description
        }
      }
    `,
    };
    fetch("/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(query),
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

  const renderProducts = () =>
    data?.getAllProducts?.map((card) => (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.name}
            </Typography>
            <Typography>{card.description}</Typography>
          </CardContent>
          <CardActions>
            <Button href={`/product/${card.id}`} size="small">
              View
            </Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  return (
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
            All Products
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {renderProducts()}
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
