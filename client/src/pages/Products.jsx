import { useQuery } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TabPanel,
  Typography,
} from "@mui/joy";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import React from "react";
import { GET_CATEGORIES } from "../schemas/queries/categories";
import { PRODUCTS } from "../schemas/queries/products";

const Products = () => {
  const { data } = useQuery(GET_CATEGORIES);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={"30px"}>
        <Tabs
          aria-label="tabs"
          defaultValue={0}
          sx={{ bgcolor: "transparent", width: "100%" }}
        >
          <TabList
            disableUnderline
            defa
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
              margin: "0 auto",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            {data?.getCategories.map((category, index) => (
              <Tab value={index} key={category.id} disableIndicator>
                {category.name}
              </Tab>
            ))}
          </TabList>
          {data?.getCategories.map((category, index) => (
            <TabPanel value={index} key={category.id}>
              <ProductItems category={category.id} />
            </TabPanel>
          ))}
        </Tabs>
      </Grid>
    </Container>
  );
};

const ProductItems = ({ category }) => {
  const { data, loading } = useQuery(PRODUCTS, {
    variables: {
      category,
    },
  });
  return (
    <>
      <Grid container spacing={3} pt={"30px"}>
        {data?.products?.map((product) => (
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
                    src={"https://picsum.photos/1000"}
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
    </>
  );
};

export default Products;
