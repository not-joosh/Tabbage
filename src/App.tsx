/*
* Authors:
*        
* Rodjean Gere
* Rhett Surban
*/
/*====================================*
*   IMPORTS
*=====================================*/  
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Parcel } from "./components/Parcel";
import { 
  LANDINGPAGE, HOME, ERROR, SIGNUP,
  LOGIN, FINDPARCEL, CREATEPARCEL,
  UPDATEPARCEL, PARCEL, PASTPARCELS,
  ACTIVEPARCELS,
} from "./lib/routes";
import { 
  LandingPage, LoginPage, SignUpPage, ErrorPage, 
  MainHome, UserQueryPage, MerchantGeneratePage,
  DriverUpdatePage, MerchantHistory, MerchantActive 
} from "./pages/pageConfig";
/*====================================*
*   COMPONENT: APP
*   Routes can be Configured Globally in routes.ts found in LIB directory...
*=====================================*/  
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/*UNIVERSAL PATHS*/}
          <Route path = {LANDINGPAGE} element = {<LandingPage />}/>
          <Route path = {LOGIN} element = {<LoginPage />}/>
          <Route path = {SIGNUP} element = {<SignUpPage />}/>
          <Route path = {HOME} element = {<MainHome />}/>
          <Route path = {ERROR} element = {<ErrorPage />}/>
          
          {/*PARCEL PATHS*/}
          <Route path = {FINDPARCEL} element = {<UserQueryPage />}/>
          <Route path = {CREATEPARCEL} element = {<MerchantGeneratePage />}/>
          <Route path = {UPDATEPARCEL} element = {<DriverUpdatePage />}/>
          <Route path = {PARCEL} element = {<Parcel />}/>
          <Route path = {PASTPARCELS} element = {<MerchantHistory />} />
          <Route path = {ACTIVEPARCELS} element = {<MerchantActive />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
