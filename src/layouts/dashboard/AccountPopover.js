import { useRef, useState, useEffect } from 'react';
 
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import firebase from './../../firebase'
import { Link as RouterLink, useNavigate,  } from 'react-router-dom';

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
const [user, setuser] = useState(null)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const logout = () =>{
    firebase.auth().signOut().then(()=>{   
     navigate("/", { replace: true });
     window.location.reload(false)
    })
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>       
        </Box>
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" onClick={()=>logout()} variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
