import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useCart } from './CartContext'; // Import the cart context

const Handbags = () => {
  const [likedItems, setLikedItems] = useState({});
  const [ratings, setRatings] = useState({});
  const { addToCart } = useCart(); // Get the addToCart function from context
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleLike = (index) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [index]: !prevLikedItems[index],
    }));
  };

  const handleRating = (index, rate) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [index]: rate,
    }));
  };

  const products = [
    { id: 1, name: "Cross Body Bags", price: 45.99, description: "Comfortable and stylish.", image: "https://i.pinimg.com/236x/93/d3/e6/93d3e65381a0b695a8df51f8d4000d96.jpg" },
    { id: 2, name: "Side Purse", price: 99.99, description: "Stylish.", image: "https://i.pinimg.com/564x/e7/ad/f0/e7adf06aaf108bfa1d366ada4402b918.jpg" },
    { id: 3, name: "Cross/Side Bag", price: 49.99, description: "For Small Items.", image: "https://i.pinimg.com/564x/ea/94/c8/ea94c80d44a52a620d46ecd0890640dd.jpg" },
    { id: 4, name: "Laptop bag", price: 89.99, description: "Waterproof.", image: "https://i.pinimg.com/564x/07/1c/ea/071ceaf7d749db60e2c6d49e3214f43c.jpg" },
    { id: 5, name: "Cash Purse", price: 35.99, description: "Small and elegant.", image: "https://i.pinimg.com/236x/66/04/8a/66048aec44b2c5350549608e5b5b18c8.jpg" },
    { id: 6, name: "Women's Totebags", price: 109.99, description: "Comfy and spaceous.", image: "https://i.pinimg.com/236x/c9/da/5d/c9da5d490a3b86d7cb209fa66d0092e3.jpg" },
    { id: 7, name: "Summer Bags", price: 99.99, description: "Aesthetic and Stylish.", image: "https://i.pinimg.com/564x/b1/d7/24/b1d724f33b7861b98f9604431a99cc38.jpg" },
    { id: 8, name: "Mother Bags", price: 159.99, description: "Leather Medium.", image: "https://i.pinimg.com/564x/bf/a6/13/bfa6134948698f196c0a3a3183b1ce74.jpg" },
    { id: 9, name: "Gym Bags", price: 200.99, description: "Cotton and Stylish.", image: "https://i.pinimg.com/236x/ef/00/bc/ef00bca9f9cdbb24b9c920160294b360.jpg" },
    { id: 10, name: "Men Packs", price: 59.99, description: "Soft feel.", image: "https://i.pinimg.com/236x/e0/4f/b3/e04fb3b4c82cf828c4bf706f05deb201.jpg" },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 m-4 w-72">
            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              {/* Like Button */}
              <button
                onClick={() => toggleLike(index)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  likedItems[index] ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                {likedItems[index] ? '❤️' : '♡'}
              </button>
            </div>

            {/* Product Details */}
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">{product.description}</p>

            {/* Star Rating */}
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer text-xl ${
                    i < (ratings[index] || 0) ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleRating(index, i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-green-300 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
              onClick={() => addToCart(product)} // Add the product to cart
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Go Back Button */}
      <div className="flex justify-center mt-8">
        <button
          className= "bg-green-200 text-black py-2 px-6 rounded-lg hover:bg-green-700"
          onClick={() => navigate('/user')}
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Handbags;
