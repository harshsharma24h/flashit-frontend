import React, { useState } from 'react';
import '../App.css';

const Createad = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('pets'); // Default category set to 'pets'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('number', number);
      formData.append('price', price);
      formData.append('category', category);
      images.forEach((image) => {
        formData.append('images', image);
      });
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
  
      const response = await fetch('https://flashit-harsh-sharma.onrender.com/create-ad', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        alert('Ad created successfully!');
        setTitle('');
        setDescription('');
        setNumber('');
        setPrice('');
        setImages([]);
        setCategory('pets');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create ad.');
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      alert(error.message || 'Failed to create ad. Please try again.');
    }
  };
  

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
  
    const compressedImages = await Promise.all(files.map(async (file) => {
      const compressedImage = await compressImage(file);
      return compressedImage;
    }));
  
    setImages(compressedImages);
  };
  
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 800; // Adjust as needed
          const maxHeight = 600; // Adjust as needed
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', 0.7); // Adjust compression quality as needed
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  

  return (
    <div className="create-ad-container mx-4">
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Create Ad</h2>
      <form onSubmit={handleSubmit} className="create-ad-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Number:</label>
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="pets">Pets</option>
            <option value="clothes">Clothes</option>
            <option value="house">House</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Images:</label>
          <input type="file" onChange={handleImageChange} multiple />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className="image-preview-item" />
        ))}
      </div>
    </div>
  );
};

export default Createad;
