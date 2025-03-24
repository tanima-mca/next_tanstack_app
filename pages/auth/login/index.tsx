import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginMutation } from "@/customHooks/query/auth.query.hooks";
import { loginProps } from "@/typeScript/auth.interface";
import { useRouter } from "next/router";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import EmailIcon from "@mui/icons-material/Email";


// import { useUserStore } from "@/toolkit/store/store";
// import { useCookies } from "react-cookie";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();

  const router = useRouter();
  // const [cookies, setCookie] = useCookies(["token"]);

  const { mutate, isPending } = loginMutation();

  const [showPassword, setShowPassword] = useState(false);
  // const { setUser,setToken } = useUserStore();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // const onSubmit = async (formData: FieldValues) => {
  //   const { email, password } = formData as { email: string; password: string };
  //   const formdata = new FormData();
  //   formdata.append("email", email);
  //   formdata.append("password", password);

  //   mutate(formData, {});
  //   console.log(formData);
  //   reset();
  //   router.push("/cms/list");
  //   reset();
  // };


  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
  
    mutate(formData, {
      onSuccess: (data) => {
        console.log("Login Successful:", data);
        router.push("/cms/list"); // ✅ Redirect only after success
      },
      onError: (error) => {
        console.error("Login Failed:", error);
      },
    });
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url('/images/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          elevation={10}
          style={{
            padding: 30,
            width: 300,
            borderRadius: 15,
            background: "#f3e5f5",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box textAlign="center">
            <Avatar style={{ background: "#5d4037", margin: "0 auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              variant="h5"
              style={{ margin: "20px 0", color: "#000", fontWeight: "bold" }}
            >
              Sign In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email format",
                  },
                })}
                label="Email"
                placeholder="Enter email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                margin: "20px 0",
                background: "#3949ab",
                color: "#fff",
                fontWeight: "bold",
              }}
              disabled={isPending}
              startIcon={
                isPending ? (
                  <RotateLeftIcon
                    sx={{ animation: "spin 1s linear infinite" }}
                  />
                ) : null
              }
            >
              {isPending ? "Loading..." : "Sign In"}
            </Button>

            <Button
              variant="text"
              fullWidth
              style={{
                color: "#3949ab",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() => router.push("/auth/registration")}
            >
              Don’t have an account? Register here
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
export default Login;
