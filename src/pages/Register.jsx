import {
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Link as MuiLink,
  useTheme,
  Box,
  Grid,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import image from "../assets/result.svg";
import RegisterForm, { registerSchema } from "../components/RegisterForm";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const { register } = useAuthCall();
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
                    <PersonAddIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Create Account
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create your free account and get started
                  </Typography>
                </Box>

                <Formik
                  initialValues={{
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    password2: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={(values, actions) => {
                    register(values);
                    actions.resetForm();
                  }}
                  component={props => <RegisterForm {...props} />}
                />

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{" "}
                    <MuiLink
                      component={Link}
                      to="/login"
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign In
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

export default Register;
