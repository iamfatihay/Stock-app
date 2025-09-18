import { Button, Box, TextField, CircularProgress } from "@mui/material";
import { Form, useFormikContext } from "formik";
import { object, string } from "yup";

export const loginScheme = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const { values, handleChange, errors, touched, handleBlur, isSubmitting } = useFormikContext();
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
        <Button 
          variant="contained" 
          type="submit" 
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
            'Login'
          )}
        </Button>
      </Box>
    </Form>
  );
};

export default LoginForm;
