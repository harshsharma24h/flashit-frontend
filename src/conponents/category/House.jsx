import React, { useState, useEffect } from 'react';
import Test from '../Test';
import { useSelector, useDispatch } from 'react-redux';



const House = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const YNvalue = useSelector((state) => state.YNvalue.value);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('https://flashit-harsh-sharma.onrender.com/get-ads');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch ads.');
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, [ads]);

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

  // Filter ads to show only those of category "House"
  const HouseAds = ads.filter(ad => ad.category === 'house');

  return (<div className="container sideBorder">
  {loading ? (
  <Test></Test>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {HouseAds.map((ad) => (
            <div key={ad._id} className="col mb-4">
              <div className="card animate" style={{ borderRadius: '15px' }}>
                {ad.images && ad.images.length > 0 ? (<div id={`carousel-${ad._id}`} className="carousel slide" data-bs-ride="carousel" style={{ cursor: 'pointer' }}>
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
                  <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="prev" style={{ display: 'none' }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${ad._id}`} data-bs-slide="next" style={{ display: 'none' }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                  <ol className="carousel-indicators" style={{
                    margin:'auto',
                    marginBottom:'3px',
                    width:'80px',
                    backgroundColor:'white',
                  borderRadius:'100px',
                  padding:'5px'
                
                    }}>



                    {ad.images.map((_, index) => (
                      <li key={index} data-bs-target={`#carousel-${ad._id}`} data-bs-slide-to={index} className={index === 0 ? 'active' : ''}  style={{
                        width: '8px', // Set the width of the indicator
                        height: '8px', // Set the height of the indicator
                        margin: '0 3px', // Adjust the spacing between the indicators
                        borderRadius:'20px',
                        backgroundColor: index === 0 ? 'red' : '#00000038', // Set the background color
                        border: index === 0 ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.5)', // Set the border
                        cursor: 'pointer', // Set cursor to pointer
                        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Add transition effect
                        
                      }}></li>
                    ))}
                  </ol>
                </div>

                ) : (
                  <div>No images available</div>
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: '800' }}>{ad.title}</h5>
                  <p className="card-text" style={{ fontWeight: '400', fontSize: '12px' }}>{ad.description}</p>

                  <p className="card-text" style={{ fontWeight: '400', fontSize: '15px' }}><small className="text-muted" alt="please login forst">{YNvalue ? ad.number : "91XXXXXX79"}</small></p>


                  {ad.createdBy && <p className="card-text" style={{ fontWeight: '400', fontSize: '15px' }}><small className="text-muted">Created by: <span style={{ color: 'black' }}> {ad.createdBy.username}</span></small></p>} {/* Display username */}
                  <p className="card-text" style={{ fontWeight: '400', fontSize: '12px' }}><small className="text-muted">Category: <strong> #{ad.category}</strong></small></p>
                  <hr />
                  
                  <h5 className="card-text" style={{ fontWeight: '800' }} >₹{ad.price}</h5>



                </div>
              </div>
            </div>
          ))}
        </div>
  )}
</div>
);
};

export default House;
