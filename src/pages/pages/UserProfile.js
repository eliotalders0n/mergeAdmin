import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Checkbox, Stack, Typography, Card, TextField, MenuItem } from '@mui/material';
// components
import Page from '../../components/Page';
import { fNumber } from '../../utils/formatNumber';
import firebase from '../../firebase' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
   const [values, setValues] = useState(null)
   const location = useLocation()
   const {data} = location.state

   const navigate = useNavigate()
   const notify = (msg) => toast(msg);

     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
console.log(data, "user")
  const createQuote = () =>{  
    firebase.firestore().collection("app_users").doc(data.id).update(values).then(()=>{
      notify("User updated successfully")    
        }).catch(err =>notify(err))
  }

  const disableAccount = (value) =>{
    firebase.firestore().collection("app_users").doc(data.id).update({
      accountDisabled: value
    }).then(()=>{
      notify("User updated") 
      navigate(-1) 
    }).catch(err =>notify(err))
  }

  return (
    <Page title="Dashboard">
     <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
     
    <Container>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography> 
      </Stack>

      <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
            <Typography>
                {data.name}
            </Typography>
            <Typography>
                {data.email} 
            </Typography>
        </Stack>
        </Card>
      <Card sx={{p:3}}>
        <Stack spacing={3}>      
        <TextField
        fullWidth
        select
        onChange={handleChange('admin')}    
        label="Admin" >
         <MenuItem  value={true}>
               Yes
            </MenuItem>
            <MenuItem  value={false}>
               No
            </MenuItem>
        </TextField>   
        <Button
        fullWidth={false}
          variant="contained"
           onClick={()=>createQuote()}
             >
          Update Profile
        </Button>

       {data.accountDisabled ?    <Button
          fullWidth={false}
          color="warning"
          variant="contained"
           onClick={()=>disableAccount(false)}
             >
          Activate Account
        </Button>
        :
        <Button
          fullWidth={false}
          color="warning"
          variant="contained"
           onClick={()=>disableAccount(true)}
             >
          Disable Account
        </Button>}

        </Stack>
      </Card>
      </Grid>
     
      </Grid>
    </Container>
  </Page>
  )
}
