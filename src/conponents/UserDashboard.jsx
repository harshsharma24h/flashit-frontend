// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { logoutUser } from './actions/userActions';

// const UserDashboard = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user); // Assuming user data is stored in Redux state

//   const handleLogout = () => {
//     dispatch(logoutUser()); // Dispatch logout action
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card mt-5">
//             <div className="card-body">
//               <h2 className="card-title mb-4">User Dashboard</h2>
//               <div className="user-details">
//                 <h4>Welcome, {user.username}</h4>
//                 <p>Email: {user.email}</p>
//                 {/* Include any other user details here */}
//               </div>
//               <div className="actions">
//                 <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
//                 {/* Include any other user actions here */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
