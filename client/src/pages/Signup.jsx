import { useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormControl, FormLabel } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { REGISTER } from "../schemas/mutations/register";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={window.location.origin}>
        Zeit & Zaatar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [mutation, { loading, error, data }] = useMutation(REGISTER);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      mutation({
        variables: {
          email: data.get("email"),
          password: data.get("password"),
          firstname: data.get("firstName"),
          lastname: data.get("lastName"),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Avatar variant="outlined" sx={{ m: "1em auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography textAlign={"center"} level="h3" mt={1}>
              Sign up
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl required>
                  <FormLabel>First name</FormLabel>
                  <Input
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>
                  <Checkbox
                    size="sm"
                    label="I want to
                  receive inspiration, marketing promotions and updates via
                  email."
                    name="persistent"
                  />
                </FormLabel>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="solid"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/login" level="title-sm" textAlign={"center"}>
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
        <Copyright level="title-sm" sx={{ mt: 5 }} />
      </Container>
    </main>
  );
}
