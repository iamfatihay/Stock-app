import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCall";
import LoginForm, { loginScheme } from "../components/LoginForm";

const Login = () => {
  const { login } = useAuthCall();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Back to Home Link */}
        <Box sx={{ mb: 3 }}>
          <MuiLink
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            Back to Home
          </MuiLink>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Form */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
            >
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Avatar
                    sx={{
                      backgroundColor: "primary.main",
                      m: "auto",
                      width: 60,
                      height: 60,
                      mb: 2,
                    }}
                  >
                    <LockIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sign in to your account
                  </Typography>
                </Box>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginScheme}
                  onSubmit={(values, actions) => {
                    login(values);
                    actions.resetForm();
                  }}
                >
                  {({ setFieldValue }) => (
                    <>
                      <LoginForm />
                      
                      {/* Demo Credentials */}
                      <Box sx={{ 
                        mt: 3, 
                        p: 2, 
                        backgroundColor: "primary.light", 
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "primary.main"
                      }}>
                        <Typography variant="h6" sx={{ mb: 2, color: "primary.dark", fontWeight: "bold" }}>
                          🚀 Demo Credentials
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.dark" }}>
                            Admin Account:
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: "monospace", 
                              backgroundColor: "rgba(255,255,255,0.7)", 
                              p: 1, 
                              borderRadius: 1,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" }
                            }}
                            onClick={() => {
                              setFieldValue('email', 'admin@stockapp.com');
                              setFieldValue('password', 'admin123');
                            }}
                          >
                            Email: admin@stockapp.com<br />
                            Password: admin123
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.dark" }}>
                            Demo Account:
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: "monospace", 
                              backgroundColor: "rgba(255,255,255,0.7)", 
                              p: 1, 
                              borderRadius: 1,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" }
                            }}
                            onClick={() => {
                              setFieldValue('email', 'demo@stockapp.com');
                              setFieldValue('password', 'demo123');
                            }}
                          >
                            Email: demo@stockapp.com<br />
                            Password: demo123
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "primary.dark", fontStyle: "italic" }}>
                          Click on any credential to auto-fill the form
                        </Typography>
                      </Box>
                    </>
                  )}
                </Formik>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don&apos;t have an account?{" "}
                    <MuiLink
                      component={Link}
                      to="/register"
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign Up
                    </MuiLink>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  maxWidth: 400,
                  width: "100%",
                  "& img": {
                    width: "100%",
                    height: "auto",
                    filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.1))",
                  },
                }}
              >
                <img src={image} alt="Stock Management" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
