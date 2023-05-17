// routes
import Router from './routes';
 
import LoginRoutes from './loginroutes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import React, {useState, useEffect} from 'react'
import firebase from './firebase'
// ----------------------------------------------------------------------

export default function App() { 
  const [state, setstate] = useState(false)  
 
  //mailgun sendingKey = 009a8bda40ff84f05b74fa0951634c1c-787e6567-52049d2e

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){         
       setstate(true)   
      }
      else{
        setstate(false)
      }
      
        })
  }, [state])

  
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
     
      {!state && <LoginRoutes />}     
      {state && <Router />}
    </ThemeConfig>
  );
}
