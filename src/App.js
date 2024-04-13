import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import BrowserRouter
import './App.css';
import Pets from './conponents/category/Pets';
import Navbar from './conponents/Navbar';
import Popup from './conponents/Popup';
import { useSelector } from 'react-redux';
import Adlist from './conponents/Adlist';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import CheckroomTwoToneIcon from '@mui/icons-material/CheckroomTwoTone';
import ChargingStationTwoToneIcon from '@mui/icons-material/ChargingStationTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import AltRouteTwoToneIcon from '@mui/icons-material/AltRouteTwoTone';
import House from './conponents/category/House';
import Mobile from './conponents/category/Mobile';
import Clothes from './conponents/category/Clothes';
import Other from './conponents/category/Other';
import Createad from './conponents/Createad';
import Users from './conponents/Users';
import Counter from './conponents/Counter';
import UserProfile from './conponents/UserProfile';
import Footer from './conponents/Footer';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginSignupClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };





  // redux values 
  const YNvalue = useSelector((state) => state.YNvalue.value);
  const userTrue = useSelector((state) => state.userLogin.value);



  console.log("this is the value coming from login reducer ", userTrue)



  return (
    <Router> {/* Wrap your entire app with Router */}
      <>
        {/* <Counter/> */}
        <Navbar />

        {/* <Createad></Createad> */}
        {/* <Popup></Popup> */}
        {/* <UserProfile></UserProfile> */}
        {/* <Users></Users> */}




        <div className="grid-container">
          
          <div className="small-column   rounded " style={{ zIndex: '1000', height: '100vh' }} >
            <Link to="/">   <HowToVoteTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '80px' }}>
              home
            </HowToVoteTwoToneIcon>
            </Link>



            <Link to="/Home">
              <HomeWorkTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '150px' }}>
                Home
              </HomeWorkTwoToneIcon>
            </Link>

            <Link to="/Mobile">
              <ChargingStationTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '220px' }}>
                Mobile
              </ChargingStationTwoToneIcon>
            </Link>


            <Link to="/Pets">
              <PetsTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '290px' }}>
                Pets
              </PetsTwoToneIcon>
            </Link>

            <Link to="/Clothes">
              <CheckroomTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '360px' }}>
                Clothes
              </CheckroomTwoToneIcon>
            </Link>

            <Link to="/Other">
              <AltRouteTwoToneIcon style={{ width: "40px", height: "80px", color: 'black', position: 'fixed', top: '430px' }}>
                Other
              </AltRouteTwoToneIcon>
            </Link>

            <AltRouteTwoToneIcon style={{ width: "40px", height: "80px", color: 'white' }}>
              Other
            </AltRouteTwoToneIcon>

          </div>





          
          <div className="large-column" style={{ marginTop: '80px', marginBottom: '70px' }}>





            <Routes>
              <Route path="/" element={<Adlist />} />
              <Route path="/Home" element={<House />} />
              <Route path="/Mobile" element={<Mobile />} />
              <Route path="/Pets" element={<Pets />} />
              <Route path="/Clothes" element={<Clothes />} />
              <Route path="/Other" element={<Other />} />
              <Route path="/login-singup" element={<Users />} />
              <Route path="/UserProfil" element={<UserProfile />} />
              <Route path="/createad" element={<Createad></Createad>} />
              {/* this is route for popup  */}


              {/* {userTrue ? (
                <Route path="/createad" element={<Createad />} />
              ) : (
                <Route path="/createad" element={<React.Fragment> <h1 className='mx-4'>Please login first to cearte an ad</h1><Users /></React.Fragment>} />
              )} */}


            </Routes>

          </div>
        </div>


        <Footer></Footer>
      </>
    </Router>

  );
}

export default App;
