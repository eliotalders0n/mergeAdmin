import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";

// material
import {
  Stack,
  TextField,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import firebase from "./../../../firebase";
import useGetHospitals from "src/hooks/useGetHospitals";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    group: Yup.string().min(1, "Too Long!").required("Group is required"),
    address: Yup.string().max(15, "Too Long!").required("Address is required"),
    age: Yup.string().max(2, "Too Long!").required("Age is required"),
    gender: Yup.string().max(8, "Too Long!").required("Gender is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  let group = useGetHospitals().docs;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      group: "",
      age: "",
      address: "",
      gender: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          formik.values.email,
          formik.values.password
        )
        .then((userCredential) => {
          console.log(userCredential);
          var user = userCredential.user;
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              firstName: formik.values.firstName,
              lastName: formik.values.lastName,
              email: formik.values.email,
              group: formik.values.group,
              age: formik.values.age,
              gender: formik.values.gender,
              address: formik.values.address,
              password: formik.values.password,
              admin: false,
            })
            .then(() => {
              //  navigate('/', { replace: true });
              console.log("added to database");
            })
            .catch((e) => console.log(e));

          // Signed ins
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);

          // ..
        });
      //    console.log(formik.values)
      //  navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Age"
              {...getFieldProps("age")}
              error={Boolean(touched.age && errors.age)}
              helperText={touched.age && errors.age}
            />

            <TextField
              fullWidth
              select
              label="Select Gender"
              {...getFieldProps("gender")}
              error={Boolean(touched.gender && errors.gender)}
              helperText={touched.gender && errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Stack>

          <TextField
            fullWidth
            label="Address"
            {...getFieldProps("address")}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />

          <TextField
            fullWidth
            select
            label="Select Group"
            {...getFieldProps("group")}
            error={Boolean(touched.group && errors.group)}
            helperText={touched.group && errors.group}
          >
            {group.map((u, index) => (
              <MenuItem value={u.id} key={index}>
                {u.GroupNumber}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
