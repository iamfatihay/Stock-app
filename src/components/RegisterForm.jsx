import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string, ref } from "yup";

export const registerSchema = object({
  username: string()
    .max(150, "Username must be less than 150 characters")
    .required("Username is required"),
  first_name: string().max(20, "First name must be less than 20 characters").required("First name is required"),
  last_name: string()
    .max(20, "Last name must be less than 30 characters")
    .required("Last name is required"),

  email: string().email().required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be a maximum of 20 characters")
    .matches(/\d+/, "Password must contain a number")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain a capital letter")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must contain a special character"),
  password2: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm password is required!"),
});

const SignUpForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="username"
            id="userName"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            //* Validation da verdigimiz semaya uymazsa ilgili mesaji gostermesi icin helperText
            helperText={touched.username && errors.username}
            //* Semaya uymadigi takdirde rengi error rengine cevirmesi icin
            error={touched.username && Boolean(errors.username)}
          />
          <TextField
            label="First Name"
            name="first_name"
            id="firstName"
            type="text"
            variant="outlined"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.first_name && errors.first_name}
            error={touched.first_name && Boolean(errors.first_name)}
          />
          <TextField
            label="Last Name"
            name="last_name"
            id="last_name"
            type="text"
            variant="outlined"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.last_name && errors.last_name}
            error={touched.last_name && Boolean(errors.last_name)}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
          />
          <TextField
            label="Confirm Password"
            name="password2"
            id="password2"
            type="password"
            variant="outlined"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password2 && errors.password2}
            error={touched.password2 && Boolean(errors.password2)}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default SignUpForm;
