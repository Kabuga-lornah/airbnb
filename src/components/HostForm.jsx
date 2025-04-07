// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   InputAdornment,
//   IconButton,
//   FormHelperText,
//   CircularProgress,
// } from '@mui/material';
// import {
//   PhotoCamera,
//   Home,
//   AttachMoney,
//   KingBed,
//   Bathtub,
//   Wifi,
//   Room as RoomIcon,
// } from '@mui/icons-material';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import Header from '../components/Header';

// const HostForm = () => {
//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     location: '',
//     price: '',
//     bedrooms: '',
//     bathrooms: '',
//     amenities: '',
//     image: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const propertyData = {
//         ...property,
//         locationLowercase: property.location.toLowerCase(),
//         price: Number(property.price),
//         bedrooms: Number(property.bedrooms),
//         bathrooms: Number(property.bathrooms),
//         amenities: property.amenities.split(',').map((item) => item.trim()),
//         createdAt: new Date(),
//       };

//       await addDoc(collection(db, 'properties'), propertyData);
//       navigate('/host/success');
//     } catch (err) {
//       console.error('Error adding property:', err);
//       setError('Failed to submit property. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
     
//       <Box sx={{ maxWidth: 880, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Typography variant="h3" fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
//             List Your Property
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Become a host and start earning with The Baobab Haven
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={4}>
//             {/* Input Fields */}
//             {[
//               {
//                 label: 'Property Title',
//                 name: 'title',
//                 icon: <Home color="primary" />,
//                 helper: 'Give your property a catchy name',
//               },
//               {
//                 label: 'Location (City, Country)',
//                 name: 'location',
//                 icon: <RoomIcon color="primary" />,
//                 helper: 'Where is your property located?',
//               },
//               {
//                 label: 'Nightly Price ($)',
//                 name: 'price',
//                 type: 'number',
//                 icon: <AttachMoney color="primary" />,
//                 helper: 'Price per night in USD',
//               },
//               {
//                 label: 'Bedrooms',
//                 name: 'bedrooms',
//                 type: 'number',
//                 icon: <KingBed color="primary" />,
//               },
//               {
//                 label: 'Bathrooms',
//                 name: 'bathrooms',
//                 type: 'number',
//                 icon: <Bathtub color="primary" />,
//               },
//               {
//                 label: 'Amenities',
//                 name: 'amenities',
//                 placeholder: 'WiFi, Pool, Kitchen, Parking, etc.',
//                 icon: <Wifi color="primary" />,
//                 helper: 'Separate amenities with commas',
//               },
//               {
//                 label: 'Image URL',
//                 name: 'image',
//                 placeholder: 'https://example.com/image.jpg',
//                 icon: (
//                   <IconButton color="primary">
//                     <PhotoCamera />
//                   </IconButton>
//                 ),
//                 isEnd: true,
//                 helper: 'Paste a direct link to your property image',
//               },
//             ].map((field, index) => (
//               <Grid key={index} item xs={12} md={field.name === 'location' || field.name === 'price' || field.name === 'bedrooms' || field.name === 'bathrooms' ? 6 : 12}>
//                 <TextField
//                   fullWidth
//                   required={field.name !== 'image' && field.name !== 'amenities'}
//                   label={field.label}
//                   name={field.name}
//                   value={property[field.name]}
//                   onChange={handleChange}
//                   type={field.type || 'text'}
//                   placeholder={field.placeholder || ''}
//                   variant="outlined"
//                   InputProps={{
//                     [field.isEnd ? 'endAdornment' : 'startAdornment']: (
//                       <InputAdornment position={field.isEnd ? 'end' : 'start'}>
//                         {field.icon}
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 2,
//                     },
//                   }}
//                 />
//                 {field.helper && <FormHelperText>{field.helper}</FormHelperText>}
//               </Grid>
//             ))}

//             {/* Description Field */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={property.description}
//                 onChange={handleChange}
//                 multiline
//                 rows={5}
//                 required
//                 variant="outlined"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//               <FormHelperText>Describe what makes your place special</FormHelperText>
//             </Grid>

//             {/* Error Message */}
//             {error && (
//               <Grid item xs={12}>
//                 <Typography color="error" sx={{ bgcolor: '#ffecec', p: 2, borderRadius: 2 }}>
//                   ⚠️ {error}
//                 </Typography>
//               </Grid>
//             )}

//             {/* Submit Button */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 3 }} />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 disabled={loading}
//                 fullWidth
//                 sx={{
//                   bgcolor: 'primary.main',
//                   color: 'white',
//                   py: 2,
//                   borderRadius: 2,
//                   fontWeight: 'bold',
//                   fontSize: '1.1rem',
//                   textTransform: 'none',
//                   boxShadow: 2,
//                   '&:hover': {
//                     bgcolor: 'primary.dark',
//                   },
//                   '&:disabled': {
//                     bgcolor: 'primary.light',
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
//                     Submitting...
//                   </>
//                 ) : (
//                   'List My Property'
//                 )}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default HostForm;


import React, { useState, useEffect } from 'react';

function HostForm({ property, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    host: '',
    images: ['/api/placeholder/600/400'],
    amenities: []
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (property) {
      setFormData({
        ...property
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' 
        ? parseFloat(value) || '' 
        : value
    });
  };

  const handleAmenityAdd = () => {
    if (amenityInput.trim() !== '' && !formData.amenities.includes(amenityInput)) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput]
      });
      setAmenityInput('');
    }
  };

  const handleAmenityRemove = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter(a => a !== amenity)
    });
  };

  const handleImageAdd = () => {
    if (imageUrl.trim() !== '' && !formData.images.includes(imageUrl)) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
      setImageUrl('');
    }
  };

  const handleImageRemove = (image) => {
    setFormData({
      ...formData,
      images: formData.images.filter(img => img !== image)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {property ? 'Edit Property' : 'Add New Property'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price per night ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="host" className="block text-gray-700 font-medium mb-2">Host Name</label>
            <input
              type="text"
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-gray-700 font-medium mb-2">Bedrooms</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bathrooms" className="block text-gray-700 font-medium mb-2">Bathrooms</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Images</label>
          <div className="flex items-center">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              onClick={handleImageAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`Property image ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(image)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Amenities</label>
          <div className="flex items-center">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add an amenity (e.g. WiFi, Pool)"
            />
            <button
              type="button"
              onClick={handleAmenityAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <span>{amenity}</span>
                <button
                  type="button"
                  onClick={() => handleAmenityRemove(amenity)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {property ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HostForm;