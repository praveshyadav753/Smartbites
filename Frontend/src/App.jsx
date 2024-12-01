import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Added Routes import
import './App.css'; 
import { CameraView } from './Components/scanner';
import Settings from './Components/Profilesetting'; 
import EditProfile from './Components/EditProfile';
import HomeView from './Components/Homemain';
import Menu from './Components/menu'; 
import Food from  './Components/Food';
import ShopList from './Components/Shoplist';
import Login from './Components/Login';
import OTPVerification from './Components/Verifyotp';
import SearchPage from './Components/searchpage';
import { useState } from'react'; 
import Productfact from './Components/Productfact';
import DietaryPreferences from './Components/dietryprefrence';
import MedicalCondition from './Components/medicalcondition';
import { AuthProvider } from './Components/AuthContext';
import { UserProvider } from './Components/Usercontext'; 

function App() {
  const [scannedProduct, setScannedProduct] = useState(null);  


  return (
    <Router>
      <div>
        <Menu />
        <UserProvider>
        <AuthProvider>
  
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/food" element={<Food />} />
          <Route path="/barcode" element={<CameraView />} />
          <Route path="/shoplist" element={<ShopList />} />
          <Route path="/proset" element={<Settings />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/scanner" element={<CameraView />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/food/:category"  element={<Food />} />
          <Route path="/product/:barcode" element={<Productfact />} />
          <Route path="/nutri-info/" element={<Productfact />} />
          <Route path="/dietry-pref" element={<DietaryPreferences />} />
          <Route path="/medical-condition" element={<MedicalCondition />}/>
          

        </Routes>
        </AuthProvider>
        </UserProvider>

      </div>
    </Router>
  );
}

export default App;
