import { useMutation } from "@apollo/client";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { FORGOT_PASSWORD } from "../schemas/mutations/forgotPassowrd";

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

export default function ForgotPassword() {
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const navigate = useNavigate();

  const { show } = useSnackbar({
    message: "Your password has been successfully updated",
    color: "primary",
    variant: "soft",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword({
        variables: {
          email: data.email,
          password: data.password,
          newPassword: data.newPassword,
        },
      }).then(() => {
        navigate("/login", {
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
              Forgot Password
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
            <FormControl required>
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                error={!!errors?.newPassword?.message}
                errorMessage={errors?.newPassword?.message}
                {...register("newPassword", {
                  required: true,
                })}
              />
            </FormControl>
            <Stack gap={4} sx={{ mt: 1 }}>
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
                Submit
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs>
                <Link href="/login" level="title-sm" variant="body2">
                  <KeyboardBackspaceIcon sx={{ marginInlineEnd: 1 }} /> Back to
                  sign in
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
