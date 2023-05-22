// material
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';

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

export default function Login() {
  return (
    <RootStyle title="Login">
    
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>        
          <LoginForm />

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
