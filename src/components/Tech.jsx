import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useCart } from './CartContext'; // Import the useCart from CartContext

const Tech = () => {
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
    { id: 1, name: "Iphone", price: 5199.99, description: "iphone 12, 64gb.", image: "https://i.pinimg.com/236x/c3/69/2a/c3692ab23eeeea0fb3ec48d90fe94e66.jpg" },
    { id: 2, name: "Samsung", price: 2299.99, description: "Samsung Galaxy,S24.", image: "https://i.pinimg.com/236x/3b/5d/a0/3b5da00ef12c70961a0300f106e525a6.jpg" },
    { id: 3, name: "Instax", price: 849.99, description: "Instax mini 12.", image: "https://i.pinimg.com/enabled_lo/236x/91/46/24/914624aa753efd387ce487e2aefb21fd.jpg" },
    { id: 4, name: "MacBook", price: 1499.99, description: "Apple MacBook Pro13.", image: "https://i.pinimg.com/236x/7d/77/7f/7d777f8e79cfd1c73fca4a10c49c702c.jpg" },
    { id: 5, name: "Wireless Speaker", price: 399.99, description: "Vintage Speaker.", image: "https://i.pinimg.com/736x/40/c0/2d/40c02de4cf0c4014c0f963a985b1222f.jpg" },
    { id: 6, name: "BookShelf Speaker", price: 1100.99, description: "Evo 6.5.", image: "https://i.pinimg.com/564x/a7/b2/2c/a7b22c0cab31fb7b8613d1446d83e70f.jpg" },
    { id: 7, name: "Airpods", price: 1920.99, description: "Apple Airpods Max.", image: "https://i.pinimg.com/236x/dd/93/95/dd9395b04668c6eb6f419ef1f4b8b180.jpg" },
    { id: 8, name: "Smart TV", price: 5459.99, description: "LG OLED TV.", image: "https://i.pinimg.com/236x/ae/2f/49/ae2f49cb8f94c2af5119a3aee1092c4b.jpg" },
    { id: 9, name: "Microwave", price: 1200.99, description: "Cubic Feet 700.", image: "https://i.pinimg.com/236x/1e/e1/67/1ee167f18d515a4e7143f906078d046d.jpg" },
    { id: 10, name: "Fridge", price: 1329.99, description: "TWo-Door Fridge.", image: "https://i.pinimg.com/236x/ed/36/d5/ed36d5f3f7d2fe67b7decb1bd632e5ae.jpg" },
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
              onClick={() => addToCart(product)} // Pass the product to addToCart
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

export default Tech;
