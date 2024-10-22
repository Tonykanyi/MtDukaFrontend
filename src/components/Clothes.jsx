import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useCart } from './CartContext'; // Import the useCart from CartContext

const Clothes = () => {
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
    { id: 1, name: "Sweats", price: 299.99, description: "Comfy, Joggy, stylish.", image: "https://i.pinimg.com/236x/df/86/f4/df86f49d46bc9b065ca4c574984d6473.jpg" },
    { id: 2, name: "Male T-Shirt", price: 199.99, description: "Plain, Cotton.", image: "https://i.pinimg.com/236x/7d/e2/d8/7de2d8327caaabf36f4bbac1ffd812bf.jpg" },
    { id: 3, name: "Female T-Shirts", price: 199.99, description: "Instax mini 12.", image: "https://i.pinimg.com/236x/af/7e/37/af7e374f5cd8b262cb47b5b8e7ffc599.jpg" },
    { id: 4, name: "Oversized T-Shirt", price: 399.99, description: "Comfy, Free.", image: "https://i.pinimg.com/236x/e0/14/81/e01481a8ca11205d8a324c50b16cc047.jpg" },
    { id: 5, name: "SwimSuit-Ladies", price: 100.99, description: "Damen-bikini.", image: "https://i.pinimg.com/236x/69/b4/76/69b476ce20a59a5c39658ec918df6185.jpg" },
    { id: 6, name: "SwimSuit-Men", price: 100.99, description: "Swim Trunks.", image: "https://i.pinimg.com/236x/00/97/a4/0097a4d6c42b6a0589f9a7984ad1a08a.jpg" },
    { id: 7, name: "Dress", price: 920.99, description: "Silky, Free.", image: "https://i.pinimg.com/236x/af/93/61/af93611c30dc91817b84daada5b24dfc.jpg" },
    { id: 8, name: "Dress", price: 509.99, description: "Casual Party.", image: "https://i.pinimg.com/236x/fc/a8/5d/fca85d4ac7f102f2a2600599e6ba628b.jpg" },
    { id: 9, name: "Khaki-Men", price: 500.99, description: "Stretchy, Stylish.", image: "https://i.pinimg.com/236x/66/50/a8/6650a8c1b06306aca9bab6ed6c2da1c7.jpg" },
    { id: 10, name: "SweatShirts", price: 329.99, description: "Warm, Free.", image: "https://i.pinimg.com/236x/82/6b/ec/826bec63cdf5e90fecb723d0f247f7bd.jpg" },
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

export default Clothes;
