import { useQuery } from "@apollo/client";
import { Container, Grid, TabPanel } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import React from "react";
import { GET_CATEGORIES } from "../schemas/queries/categories";

const Products = () => {
  const { data, loading } = useQuery(GET_CATEGORIES);
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={"30px"}>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList>
            {data?.getCategories.map((category) => (
              <Tab>{category.name}</Tab>
            ))}
          </TabList>
          <TabPanel value={0}>
            <b>First</b> tab panel
          </TabPanel>
          <TabPanel value={1}>
            <b>Second</b> tab panel
          </TabPanel>
          <TabPanel value={2}>
            <b>Third</b> tab panel
          </TabPanel>
        </Tabs>
      </Grid>
    </Container>
  );
};

export default Products;
