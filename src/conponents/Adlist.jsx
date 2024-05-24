// import React, { useState, useEffect } from 'react';
// import loadingImage from '../images/loading.gif';
// import '../App.css';
// import Card from './Card';
// import Test from './Test';

// const Adlist = () => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/get-ads');
//         if (response.ok) {
//           const data = await response.json();
//           setAds(data);
//           setLoading(false);
//         } else {
//           throw new Error('Failed to fetch ads.');
//         }
//       } catch (error) {
//         console.error('Error fetching ads:', error);
//       }
//     };

//     fetchAds();
//   }, [ads]);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/delete-ad/${id}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         console.log('Ad deleted successfully');
//         // Refresh ads after deletion
//         setAds([]);
//       } else {
//         const data = await response.json();
//         throw new Error(data.message || 'Failed to delete ad.');
//       }
//     } catch (error) {
//       console.error('Error deleting ad:', error);
//       alert(error.message || 'Failed to delete ad. Please try again.');
//     }
//   };

//   console.log(ads);

//   return (
//     <div className="container sideBorder">
//       {loading ? (
//         <Test />
//       ) : (
//         <div className="row row-cols-4">
//           {ads.map((ad) => (
//             <div key={ad._id} className="col mb-4">
//               <div className="card animate">
//                 {ad.images && ad.images.length > 0 ? (
//                   <div id={`carousel-${ad._id}`} className="carousel slide" data-bs-ride="carousel" style={{ cursor: 'pointer' }}>
//                     <div className="carousel-inner">
//                       {ad.images.map((image, index) => (
//                         <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
//                           {image && image.contentType && image.data && (
//                             <img
//                               src={`data:${image.contentType};base64,${image.data}`}
//                               className="d-block w-100"
//                               alt={`Image ${index}`}
//                               style={{ height: '300px', objectFit: 'cover' }}
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="prev">
//                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                       <span className="visually-hidden">Previous</span>
//                     </button>
//                     <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="next">
//                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                       <span className="visually-hidden">Next</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div>No images available</div>
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{ad.title}</h5>
//                   <p className="card-text">{ad.description}</p>
//                   <p className="card-text"><small className="text-muted">number:{ad.number}</small></p>
//                   <p className="card-text"><small className="text-muted">Price: Rs{ad.price}</small></p>
//                   <p className="card-text"><small className="text-muted">Category: #{ad.category}</small></p>
//                   {ad.createdBy && <p className="card-text"><small className="text-muted">Created by: {ad.createdBy}</small></p>}
//                   <a className="btn btn-secondary" onClick={() => handleDelete(ad._id)}>delete</a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Adlist;







import React, { useState, useEffect ,useMemo} from 'react';
import loadingImage from '../images/loading.gif';
import '../App.css';
import Card from './Card';
import Test from './Test';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';






const Adlist = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const YNvalue = useSelector((state) => state.YNvalue.value);
  const [fav, setFav] = useState([])
  const [cart, setCart] = useState([])



  const fetchAds = async () => {
    try {
      const response = await fetch('https://flashit-harsh-sharma.onrender.com/get-ads');
      if (response.ok) {
        const data = await response.json();
        const latest = data.reverse();
        console.log('all ads', data);
        setAds(latest);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch ads.');
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };


  const memoizedAds = useMemo(() => ads, [ads]);


  useEffect(() => {
    if (ads.length === 0) {
      fetchAds();
    }
  }, []);






  useEffect(() => {
    const intervalId = setInterval(() => {
      moveNext();
    }, 2000); // Change the interval duration as needed

    return () => clearInterval(intervalId);
  }, []); // Run this effect only once on component mount












  const moveNext = () => {
    ads.forEach((ad) => {
      const carousel = document.getElementById(`carousel-${ad._id}`);
      if (carousel) {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
        const nextIndex = (activeIndex + 1) % ad.images.length;
        carousel.querySelector(`[data-bs-slide-to="${nextIndex}"]`).click();
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://flashit-harsh-sharma.onrender.com/delete-ad/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Ad deleted successfully');
        // Refresh ads after deletion
        setAds([]);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete ad.');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert(error.message || 'Failed to delete ad. Please try again.');
    }
  };



  const Addtocart = (iteam) => {
    let a = ads.filter((e, i) => (
      iteam == i
    ))
    setCart(list => [...list, a])
    console.log(cart)
  }


  const removFav = (i) => {
    let a = fav.filter((e, ind) => (
      e !== i
    ))
    console.log(a, "fromfilter")
    setFav(a)
  }



  const addFav = (i) => {
    console.log(fav, 'this from addfav')
    if (!fav.includes(i)) {

      const b = ads.filter((e, index) => (
        i == index
      ))


      setFav(b)
      console.log(fav, 'this from addfav')
    }



  }


  return (
    <div className="container sideBorder">


      {loading ? (
        <Test />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {memoizedAds.map((ad, index) => (
            <div key={ad._id} className="col mb-4">
              <div className="card animate" style={{ borderRadius: '15px' }}>
                {ad.images && ad.images.length > 0 ? (
                  <div id={`carousel-${ad._id}`} className="carousel slide" data-bs-ride="carousel" style={{ cursor: 'pointer' }}>
                    <div className="carousel-inner">
                      {ad.images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          {image && image.contentType && image.data && (
                            <img
                              src={`data:${image.contentType};base64,${image.data}`}
                              className="d-block w-100"
                              alt={`Image ${index}`}
                              style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="prev" style={{}}>
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="next" style={{}}>
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                    <ol className="carousel-indicators" style={{
                      margin: 'auto',
                      marginBottom: '3px',
                      width: '80px',
                      backgroundColor: 'white',
                      borderRadius: '100px',
                      padding: '5px'

                    }}>

                      {ad.images.map((_, index) => (
                        <li key={index} data-bs-target={`#carousel-${ad._id}`} data-bs-slide-to={index} className={index === 0 ? 'active' : ''} style={{
                          width: '8px', // Set the width of the indicator
                          height: '8px', // Set the height of the indicator
                          margin: '0 3px', // Adjust the spacing between the indicators
                          borderRadius: '20px',
                          backgroundColor: index === 0 ? 'red' : '#00000038', // Set the background color
                          border: index === 0 ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.5)', // Set the border
                          cursor: 'pointer', // Set cursor to pointer
                          transition: 'background-color 0.3s ease, border-color 0.3s ease', // Add transition effect
                        }}></li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div> No images available</div>
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: '800' }}>{ad.title}</h5>
                  <p className="card-text" style={{ fontWeight: '400', fontSize: '12px' }}>{ad.description}</p>
                  <p className="card-text" style={{ fontWeight: '400', fontSize: '15px' }}><small className="text-muted" alt="please login forst">Number: <strong> {YNvalue ? ad.number : "91XXXXXX79"}</strong></small></p>
                  {ad.createdBy && <p className="card-text" style={{ fontWeight: '400', fontSize: '15px' }}><small className="text-muted">Created by: <span style={{ color: 'black' }}> {ad.createdBy.username}</span></small></p>} {/* Display username */}
                  <p className="card-text" style={{ fontWeight: '400', fontSize: '12px' }}><small className="text-muted">Category: <strong> #{ad.category}</strong></small></p>
                  <hr />
                  <span> <h5 className="card-text" style={{ fontWeight: '800' }} >₹{ad.price.toLocaleString('en-IN')}</h5> 
                  {/* {fav.includes(ad) ? <FavoriteIcon onClick={() => removFav(index)} /> : <FavoriteBorderIcon onClick={() => addFav(index)} />}   */}
                  </span>








                  {/* <button onClick={() => Addtocart(index)} type="button" class="btn btn-primary position-relative" style={{ position: 'fixed' }}>
                    Add to Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.length}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
          {<>{
            fav.map((hm) => (
              <h5 >{hm.title
}</h5>
            ))}

          </>}


        </div>
      )}
    </div>
  );
};

export default Adlist;
