import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { YesTrue, NoFalse } from '../reducers/singinSingupReducer';
import Popup from './Popup';
import { ProgressBar } from "react-progressbar-fancy";
import LogoutIcon from '@mui/icons-material/Logout';
import LocalMallIcon from '@mui/icons-material/LocalMall';


function Navbar() {
    const [showPopup, setShowPopup] = useState(false);

    const handleLoginSignupClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const dispatch = useDispatch();
    const YNvalue = useSelector((state) => state.YNvalue.value);


    const checkLogin = () => {
        let a = localStorage.getItem('token')

        if (a && a.length !== 0) {
            dispatch(NoFalse())
        }
    }

    checkLogin()


    const handleLogout = async () => {
        try {
            const response = await fetch('https://flashit-harsh-sharma.onrender.com/logout', {
                method: 'POST',
            });

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = 'login-singup';
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-warning bg-info shadow rounded fixed-top"> {/* Add 'fixed-top' class to make the navbar fixed to the top */}
                <div  className="container-fluid">
                    <a className="navbar-brand">
                        <Link className='text' to="/">  <span className='text'> 🟡🟡FlashIT   </span> </Link>
                    </a>

                    <div className="ms-auto">
                        {YNvalue ? (
                            <div>
                                <Link to="/UserProfil">
                                    <AccountCircleTwoToneIcon alt="user" style={{ width: "40px", height: "30px", color: 'black' }} />
                                </Link>
                                <LogoutIcon  alt="logout" onClick={handleLogout} ></LogoutIcon>

                            </div>
                        ) :
                            (
                                <Link to="/login-singup">
                                    <button type="button" className="btn btn-warning mx-2"> Login/ Singup </button>
                                </Link>
                            )}
                    </div>
                    {/* <button type="button" class="btn btn-primary position-relative">
                        cart
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            99+
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </button> */}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
