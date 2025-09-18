import { Box, Button, TextField, CircularProgress, Grid } from "@mui/material";
import { Form } from "formik";
import { object, string, ref } from "yup";
import PropTypes from "prop-types";

export const registerSchema = object({
  username: string()
    .max(150, "Username must be less than 150 characters")
    .required("Username is required"),
  first_name: string()
    .max(20, "First name must be less than 20 characters")
    .required("First name is required"),
  last_name: string()
    .max(20, "Last name must be less than 20 characters")
    .required("Last name is required"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is mandatory"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/\d+/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must contain at least one special character"),
  password2: string()
    .oneOf([ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const RegisterForm = ({ values, handleChange, errors, touched, handleBlur, isSubmitting }) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Username"
          name="username"
          id="userName"
          type="text"
          variant="outlined"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.username && errors.username}
          error={touched.username && Boolean(errors.username)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
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
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
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
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
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
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>
    </Form>
  );
};

RegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default RegisterForm;
