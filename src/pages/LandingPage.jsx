import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Inventory,
  Analytics,
  Security,
  Speed,
  Support,
  ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Hero Section Component
const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Modern Stock Management
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Take your business to the next level with advanced inventory management.
              Real-time tracking, smart analytics, and easy-to-use interface.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Sign Up Free
              </Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: 300, md: 400 },
                  height: { xs: 300, md: 400 },
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <TrendingUp sx={{ fontSize: { xs: 120, md: 150 }, color: 'white' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Real-Time Analytics',
      description: 'Track your business performance with instant data analysis.',
    },
    {
      icon: <Inventory sx={{ fontSize: 40 }} />,
      title: 'Smart Inventory',
      description: 'Automatic stock tracking and alert system ensures no product runs out.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Data',
      description: 'Your data is protected with industry-standard security.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Fast Operations',
      description: 'Complete your operations quickly with optimized interface.',
    },
    {
      icon: <Support sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'We are always with you with uninterrupted customer support.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Growth Focused',
      description: 'Scalable solutions suitable for your business growth.',
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          Why Choose StockApp?
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Comprehensive stock management solution designed for modern businesses
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: '1000+', label: 'Happy Customers' },
    { number: '50K+', label: 'Transactions/Day' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Card
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
          }}
        >
          <CardContent>
            <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Create your free account and discover the power of StockApp.
              No credit card required.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Free
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

// Footer Component
const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        backgroundColor: 'grey.900',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          StockApp
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © 2024 StockApp. All rights reserved. Modern stock management solutions.
        </Typography>
      </Container>
    </Box>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
