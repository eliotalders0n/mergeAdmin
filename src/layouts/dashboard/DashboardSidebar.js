import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
// components
// import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';
import firebase from './../../firebase'
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 220;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
 
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [user, setuser] = useState(null)
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((snap)=>{
      console.log(snap.data())
      setuser(snap.data())
      
    })
  }, [])

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ my: 2, mx: 5 }}>
      <h3>MERGE ADMIN</h3>
      </Box>
  
      <Box sx={{ mb: 5, mx: 2.5 }}>
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
           
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Hello  {user && user.firstName}
              </Typography>
              
            </Box>
          </AccountStyle>
      </Box>

   
     <NavSection navConfig={sidebarConfig} />
      
   
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          anchor="bottom"
          open
          variant="persistent"
          // open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: "100%" }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
