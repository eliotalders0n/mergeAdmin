import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';
// import AuthSocial from '../sections/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register">
      <AuthLayout>
      
      </AuthLayout>
 
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Create an Account
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
           
            </Typography>
          </Box>

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to HospitalFinder Dashboard&nbsp;
            <Link underline="always" color="textPrimary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
              display: { }
            }}
          >
            Already have an account?&nbsp;
            <Link underline="hover" to="/" component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
