// import React, { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Retrieve token from local storage
//       console.log(token)
//       if (!token) {
//         throw new Error('Token not found');
//       }
//       const response = await fetch('https://flashit-harsh-sharma.onrender.com/user-profile', {
//         headers: {
//           'Authorization': `Bearer ${token}` // Attach token to request headers
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch user profile');
//       }
//       const userProfile = await response.json();
//       setUserData(userProfile);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   fetchUserProfile();
// }, []);


//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userData) {
//     return <div>No user data found</div>;
//   }

//   return (
//     <div>
//       <h1>{userData.username}</h1>
//       <h1>Number of Ads Posted: {userData.adsPosted}</h1>
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve token from local storage
//         console.log("the userprofile ", token)
//         if (!token) {
//           throw new Error('Token not found');
//         }
//         const response = await fetch('https://flashit-harsh-sharma.onrender.com/user-profile', {
//           headers: {
//             'Authorization': `Bearer ${token}` // Attach token to request headers
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch user profile');
//         }
//         const userProfile = await response.json();
//         console.log('userProfile:', userProfile); // Log userProfile
//         setUserData(userProfile);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };


//     fetchUserProfile();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userData) {
//     return <div>No user data found</div>;
//   }

//   return (
//     <div>
//       <h1>{userData.username}</h1>
//       <h1>Ads Posted:</h1>
//       <ul>
//         {userData.adsPosted.map(ad => (
//           <li key={ad._id}>
//             <div>Title: {ad.title}</div>
//             <div>Description: {ad.description}</div>
//             {/* Add more details of the ad as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import Test from './Test';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You Need To Login First');
      }
      const response = await fetch('https://flashit-harsh-sharma.onrender.com/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userProfile = await response.json();
      setUserData(userProfile);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);



  const handleLogout = async () => {
    try {
      const response = await fetch('https://flashit-harsh-sharma.onrender.com/logout', {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        window.location.href = '/login-singup';
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://flashit-harsh-sharma.onrender.com/delete-ad/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Ad deleted successfully');
        // After deletion, fetch user profile again to update adsPosted
        fetchUserProfile();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete ad.');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert(error.message || 'Failed to delete ad. Please try again.');
    }
  };

  if (isLoading) {
    return <div>
      <div className='border p-3 p-md-5 shadow rounded my-3'>
        <h4>User Name of the user: <span className="text-danger">loading...</span></h4>
        <h6>Total Number Of Ads Created By User: <span className="text-danger">loading...</span></h6>
        <div className="d-flex flex-column flex-md-row justify-content-md-start justify-content-center align-items-center">
          <Link to="/createad" className="text-decoration-none">
            <button type="button" className="btn btn-secondary my-2 my-md-0 mx-0 mx-md-1">Create Ad</button>
          </Link>
          <button type="button" onClick={handleLogout} className="btn btn-warning mx-0 mx-md-1">Logout</button>
        </div>
      </div>

      <Test /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

 

  return (
    <div className='poppinstext mx-3'>
      <div className='border p-3 p-md-5 shadow rounded my-3'>
        <h4>User Name of the user: <span className="text-danger">{userData.username}</span></h4>
        <h6>Total Number Of Ads Created By User: <span className="text-danger">{userData.adsPosted.length}</span></h6>
        <div className="d-flex flex-column flex-md-row justify-content-md-start justify-content-center align-items-center">
          <Link to="/createad" className="text-decoration-none">
            <button type="button" className="btn btn-secondary my-2 my-md-0 mx-0 mx-md-1">Create Ad</button>
          </Link>
          <button type="button" onClick={handleLogout} className="btn btn-warning mx-0 mx-md-1">Logout</button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {userData.adsPosted.map(ad => (
          <div key={ad._id} className="col">
            <div className="card">
              {ad.images && ad.images.length > 0 ? (
                <div id={`carousel-${ad._id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {ad.images.map((image, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img
                          src={`data:${image.contentType};base64,${image.data}`}
                          className="d-block w-100"
                          alt={`Image ${index}`}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <div>No images available</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text">{ad.description}</p>
                <p className="card-text"><small className="text-muted">Number: {ad.number}</small></p>
                <p className="card-text"><small className="text-muted">Price: Rs {ad.price}</small></p>
                <p className="card-text"><small className="text-muted">Category: #{ad.category}</small></p>
                {ad.createdBy && <p className="card-text"><small className="text-muted">Created by: {ad.createdBy.username}</small></p>}
                <button className="btn btn-danger" onClick={() => handleDelete(ad._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
