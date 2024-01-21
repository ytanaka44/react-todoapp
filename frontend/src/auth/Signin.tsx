import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useLayoutEffect } from "react";
import * as Yup from "yup";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import Loading from "../components/Loading";
import { FormikTextField } from "../components/FormikTextField";

const Signin: React.FC = () => {
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (state) => {
      signInWithEmailAndPassword(auth, state.email, state.password)
        .then((user) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  useLayoutEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "100%",
          width: "280px",
          m: "20px auto",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography>Signin</Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormikTextField
              name="email"
              label="Email *"
              variant="standard"
              formik={formik}
            />
            <FormikTextField
              name="password"
              label="Password *"
              variant="standard"
              type="password"
              formik={formik}
            />
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
            <Link to={"/signup"}>Create account</Link>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signin;
