import { Link as RouterLink, useNavigate,  } from 'react-router-dom';
import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Checkbox, Stack, Typography, Card, TextField, MenuItem } from '@mui/material';
// components
import Page from '../../components/Page';
 
import firebase from '../../firebase' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetUser from 'src/hooks/useGetUser';
import User from '../User';

export default function MyProfile() {
  const navigate = useNavigate();
    const [values, setValues] = useState(null)
 
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
   
      const [user_, setdocs] = useState([])

      useEffect(() => {
           firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((doc)=>{
              setdocs(doc.data())
           })
      }, [])



  const logout = () =>{
    firebase.auth().signOut().then(()=>{   
     navigate("/", { replace: true });
     window.location.reload(false)
    })
  }

  return (
    <Page title="Dashboard">
    <Container maxWidth="x1">
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography> 
      </Stack>

      <Grid container spacing={3}>

      <Grid item xs={3} md={6} sm={12}>
      <Card sx={{p:3}}>
        <Stack spacing={3}>

        <Typography variant="body2" gutterBottom>
        Full Name 
        <Typography variant="h5" gutterBottom>
        {user_.firstName} {user_.lastName}
        
        </Typography> 
        </Typography> 


        <Typography variant="body2" gutterBottom>
        Email
        <Typography variant="h5" gutterBottom>
        {user_.email}
        </Typography> 
        </Typography> 

         
        
        <Button
        fullWidth={false}
          variant="contained"
           onClick={()=>logout()}
             >
       Log Out
        </Button>

        
        </Stack>
      </Card>
      </Grid>
     
      
       
      </Grid>
    </Container>
  </Page>
  )
}
