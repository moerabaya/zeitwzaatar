import { useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/snackbar";
import { useUser } from "../context/user.tsx";
import { LOGIN } from "../schemas/mutations/login";

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

export default function SignIn() {
  const [login, { loading, error }] = useMutation(LOGIN);
  const { user, refetch } = useUser();
  const { show } = useSnackbar({
    message: `Welcome back ${user?.firstname}`,
    color: "primary",
    variant: "soft",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      }).then((res) => {
        refetch();
        navigate("/", {
          replace: true,
        });
        show();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container component="main" maxWidth="xs">
        <Stack sx={{ mt: 8 }}>
          <Box>
            <Avatar variant="outlined" sx={{ m: "1em auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography textAlign={"center"} level="h3" mt={1}>
              Sign in
            </Typography>
          </Box>
          <Stack gap={2} sx={{ mt: 4 }}>
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                error={!!errors?.email?.message}
                errorMessage={errors?.email?.message}
                {...register("email", {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl required>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                error={!!errors?.password?.message}
                errorMessage={errors?.password?.message}
                {...register("password", {
                  required: true,
                })}
              />
            </FormControl>
            <Stack gap={4} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox size="sm" label="Remember me" name="persistent" />
              </Box>
              {!!error && (
                <Box marginTop="10px">
                  <Alert variant="filled" severity="error">
                    {error.message}
                  </Alert>
                </Box>
              )}

              <Button
                type="submit"
                loading={loading}
                loadingPosition="start"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
                fullWidth
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" level="title-sm" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" level="title-sm">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Copyright level="title-sm" sx={{ mt: 5, mb: 4 }} />
      </Container>
    </form>
  );
}
