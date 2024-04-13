import React, { useState } from 'react';
import '../App.css';

function Card() {
  const [demoad, setDemoad] = useState([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);

  return (
    <div className="container sideBorder">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {demoad.map((item, index) => (
          <div key={index} className="col mb-4">
            <div className="custom-card card animate" style={{ borderRadius: '20px', width: '15rem', margin: '0 auto' }}>
              <div className="skeleton-loading" style={{ height: '300px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                <div className="color-animation" style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '-100%', background: 'linear-gradient(to right, #f0f0f0, #e0e0e0, #f0f0f0)', animation: 'slideRight 1.5s infinite' }}>

                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title skeleton-loading" style={{ width: '80%', marginBottom: '10px' }}></h5>
                <p className="card-text skeleton-loading" style={{ width: '90%' }}></p>
                <p className="card-text skeleton-loading" style={{ width: '50%' }}></p>
                <a href="#" className="btn btn-secondary skeleton-loading" style={{ width: '100px', height: '40px', marginTop: '10px' }}></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
