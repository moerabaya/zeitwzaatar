import { AspectRatio, Box, Card, CardContent, Container, Grid } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import React from "react";

const Home = () => {
  const [data, setData] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const fetchData = React.useCallback(() => {
    const query = `
      query ($name: String! = ""){
        getProductsByName(name: $name) {
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
          name: search,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from server", data);
        setData(data.data);
      });
  }, [search]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={"30px"}>
        {data?.getProductsByName.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box
              component="a"
              href={`/product/${product.id}`}
              sx={{ textDecoration: "none" }}
            >
              <Card>
                <AspectRatio minHeight="180px" maxHeight="250px">
                  <img
                    component="img"
                    height="200"
                    src={"https://source.unsplash.com/random?olive-oil"}
                    alt={product.name}
                  />
                </AspectRatio>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
