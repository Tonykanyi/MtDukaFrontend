import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useCart } from './CartContext'; // Import the useCart from CartContext

const Shoes = () => {
  const [likedItems, setLikedItems] = useState({});
  const [ratings, setRatings] = useState({});
  const { addToCart } = useCart(); // Use addToCart from the context
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
    { id: 1, name: "Puma", price: 199.99, description: "Unisex , Comfortable.", image: "https://i.pinimg.com/236x/cc/48/31/cc48319bd0897c63838f3bdd9dd81598.jpg" },
    { id: 2, name: "Samba", price: 299.99, description: "Green Sambas, Unisex.", image: "https://i.pinimg.com/236x/85/83/54/858354d602aac7bb0a2167b0adff06a8.jpg" },
    { id: 3, name: "New Balance", price: 149.99, description: "Sporty and Comfortable.", image: "https://i.pinimg.com/enabled_lo/236x/02/d7/e7/02d7e77cc6e8b67c9efd9b32b8301f8d.jpg" },
    { id: 4, name: "Pandas", price: 499.99, description: "Green Nike.", image: "https://i.pinimg.com/236x/a6/d3/90/a6d390738f0572ecf83d10e3fe4d3415.jpg" },
    { id: 5, name: "Slippers", price: 399.99, description: "Flurry Women Slippers.", image: "https://i.pinimg.com/236x/ea/ea/cb/eaeacb09dff5f08379d23ac3646acabe.jpg" },
    { id: 6, name: "Crocs", price: 100.99, description: "Comfy.", image: "https://i.pinimg.com/236x/2b/98/34/2b98348fe4ffdd2b31fb02516c6aeac5.jpg" },
    { id: 7, name: "Sandals", price: 120.99, description: "Female , Stylish.", image: "https://i.pinimg.com/enabled_lo/236x/44/52/cb/4452cb49fa73b22572a0cb30fd905993.jpg" },
    { id: 8, name: "Flips", price: 159.99, description: "Summer Slides.", image: "https://i.pinimg.com/564x/f7/f5/c8/f7f5c80b4aa8f48fb287b64134c95c8d.jpg" },
    { id: 9, name: "Heels", price: 200.99, description: "Comfy inches.", image: "https://i.pinimg.com/236x/6a/91/4d/6a914d337120b5a978284319faa870ef.jpg" },
    { id: 10, name: "Open Heels", price: 329.99, description: "Soft velvet feel.", image: "https://i.pinimg.com/564x/89/a1/a2/89a1a2bbc1d48728c16c4108dc40af38.jpg" },
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
          className="bg-green-200 text-black py-2 px-6 rounded-lg hover:bg-green-700"
          onClick={() => navigate('/user')}
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Shoes;
