// import {
//   Button,
//   Grid2,
//   Paper,
//   TextField,
//   Typography,
//   Avatar,
//   Box,
//   IconButton,
// } from "@mui/material";
// import React, { useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { loginMutation } from "@/customHooks/query/auth.query.hooks";
// import { loginProps } from "@/typeScript/auth.interface";
// import { useRouter } from "next/router";

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<loginProps>();
//   const router = useRouter();
//   const { mutate, isPending } = loginMutation();
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // ....Functions......
//   const onsubmit = async (formData: FieldValues) => {
//     const { email, password } = formData as { email: string; password: string };
//     const formdata = new FormData();
//     formdata.append("email", email);
//     formdata.append("password", password);
//     mutate(formData, {});
//     console.log(formData);
//     reset();
//     router.push("/cms/list")
    
//   };

//   const handleLoginError = () => {
//       router.push("/auth/registration"); 
      
//     }
  

//   return (
//     <>
//       <Grid2
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{
//           minHeight: "100vh",
//           background: "#bbdefb",
//         }}
//       >
//         <Paper
//           elevation={10}
//           style={{
//             padding: 30,
//             width: 300,
//             borderRadius: 15,
//             background: "#f3e5f5",
//             boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
//           }}
//         >
//           <Box textAlign="center">
//             <Avatar style={{ background: "#5d4037", margin: "0 auto" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography
//               variant="h5"
//               style={{ margin: "20px 0", color: "#000", fontWeight: "bold" }}
//             >
//               Sign In
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit(onsubmit)}>
//             <TextField
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                   message: "Invalid email format",
//                 },
//               })}
//               label="Email"
//               placeholder="Enter email"
//               fullWidth
//               margin="normal"
//               error={!!errors.email}
//               helperText={errors.email && errors.email.message}
//             />

//             <Box sx={{ position: "relative", width: "100%" }}>
//               <TextField
//                 {...register("password", { required: "Password is required" })}
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//               <IconButton
//                 onClick={togglePasswordVisibility}
//                 sx={{
//                   position: "absolute",
//                   right: 10,
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                 }}
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </Box>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               style={{
//                 margin: "20px 0",
//                 background: "#3949ab",
//                 color: "#fff",
//                 fontWeight: "bold",
//               }}
//               disabled={isPending}
//             >
//               {isPending ? "Loading..." : "Sign In"}
//             </Button>

//             <Button
//               variant="text"
//               fullWidth
//               style={{
//                 color: "#3949ab",
//                 fontWeight: "bold",
//                 textTransform: "none",
//               }}
//               onClick={handleLoginError}
//             >
//               Don’t have an account? Register here
//             </Button>
//           </form>
//         </Paper>
//       </Grid2>
//     </>
//   );
// };

// export default Login;



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
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();

  const router = useRouter();
  const { mutate, isPending } = loginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
  
    mutate(
      { email, password },
      {
        onSuccess: (data: any) => {
          // console.log("✅ Full Login Response:", JSON.stringify(data, null, 2));
          if (data?.status === 200 && data?.token) {
            // console.log("✅ Login successful! Redirecting to /cms/list...");
            localStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => {
               window.location.href = "/cms/list";
            }, 200);
          } else {
            // console.log("❌ Login failed! Redirecting to /auth/registration...");
            router.push("/auth/registration");
          }
        },
        onError: (error) => {
          // console.error("❌ Login Error:", error);
          router.push("/auth/registration");
        },
      }
    );
  
    reset();
  };
  
  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "#bbdefb",
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
            startIcon={isPending ? <RotateLeftIcon sx={{ animation: 'spin 1s linear infinite' }} /> : null}
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
  );
};

export default Login;

