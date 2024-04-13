// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { login } from '../reducers/createadreducer';
// import Createad from './Createad';
// import { YesTrue, NoFalse } from '../reducers/singinSingupReducer';



// const Users = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');

//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isSignUp ? 'register' : 'login';
//       const response = await fetch(`https://flashit-harsh-sharma.onrender.com/${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       if (response.ok) {
//         const message = isSignUp ? 'User registered successfully!' : 'User logged in successfully!';
//         setMessage(message);
//         setIsLoggedIn(true);
//         dispatch(login()); // Dispatching the login action upon successful login
//         dispatch(NoFalse()); //it will return true this the mistake in reduser 
//       } else {
//         const message = isSignUp ? 'User registration failed.' : 'Invalid username or password.';
//         setMessage(message);
//       }
//     } catch (error) {
//       console.error(`Error ${isSignUp ? 'registering' : 'logging in'} user:`, error);
//       setMessage(`Error ${isSignUp ? 'registering' : 'logging in'} user.`);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="">
//           <div className="card mt-5">
//             <div className="card-body">
//               {isLoggedIn ? (
//                 <p className="text-success">You are logged in successfully! <Createad /></p>
//               ) : (
//                 <>
//                   <h2 className="card-title mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
//                   <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <button type="submit" className="btn btn-secondary btn-block">
//                       {isSignUp ? 'Sign Up' : 'Login'}
//                     </button>
//                   </form>
//                   <p className="mt-3 text-center">{message}</p>
//                   <p className="mt-3 text-center">
//                     {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
//                     <button onClick={() => setIsSignUp(!isSignUp)} className="btn btn-link">
//                       {isSignUp ? 'Login here' : 'Sign Up here'}
//                     </button>
//                   </p>
                  
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/createadreducer';
import Createad from './Createad';
import { NoFalse } from '../reducers/singinSingupReducer';

const Users = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there is a token in localStorage indicating the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      dispatch(NoFalse());
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? 'register' : 'login';
      const response = await fetch(`https://flashit-harsh-sharma.onrender.com/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = isSignUp ? 'User registered successfully!' : 'User logged in successfully!';

        setMessage(successMessage);

        // Store authentication token in localStorage
        localStorage.setItem('token', data.token);

        setIsLoggedIn(true);
        dispatch(NoFalse()); // Dispatching the login action upon successful login

        window.location.href = '/';
      } else {
        const errorMessage = isSignUp ? 'User registration failed.' : 'Invalid username or password.';
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(`Error ${isSignUp ? 'registering' : 'logging in'} user:`, error);
      setMessage(`Error ${isSignUp ? 'registering' : 'logging in'} user.`);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://flashit-harsh-sharma.onrender.com/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Remove the authentication token from localStorage upon logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


// this is for userprofil 
 if (isLoggedIn){
  dispatch(NoFalse());
 }



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              
              {isLoggedIn ? (
                <div>
                  <h2 className="text-center mb-4">Logged In</h2>
                  <p className="text-success text-center">You are logged in successfully!</p>
                  
                
                  <button onClick={handleLogout} className="btn btn-secondary btn-block mt-3">Logout</button>
                </div>
              ) : (
                <div>
                  <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">
                      {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                  </form>
                  <p className="mt-3 text-center">{message}</p>
                  <p className="mt-3 text-center">
                    {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="btn btn-link">
                      {isSignUp ? 'Login here' : 'Sign Up here'}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
