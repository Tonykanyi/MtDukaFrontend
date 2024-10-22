// Furniture.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the cart context

const Furniture = () => {
  const [likedItems, setLikedItems] = useState({});
  const [ratings, setRatings] = useState({});
  const { addToCart } = useCart(); // Get the addToCart function from context
  const navigate = useNavigate();

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
    { id: 1, name: "Modern Sofa", price: 499.99, description: "Comfortable and stylish.", image: "https://i.pinimg.com/236x/6b/61/d3/6b61d3ac664e4d383fb9c8415631d4bc.jpg" },
    { id: 2, name: "Elegant Armchair", price: 199.99, description: "Perfect for any living room.", image: "https://i.pinimg.com/236x/5e/f1/9e/5ef19ec73146b3b29a11c8939e8b6558.jpg" },
    { id: 3, name: "Wooden Coffee Table", price: 149.99, description: "Adds warmth to any space.", image: "https://i.pinimg.com/236x/5f/6a/24/5f6a248acde6aff544eb20afaf2c97c5.jpg" },
    { id: 4, name: "Bookshelf", price: 299.99, description: "Spacious and elegant.", image: "https://i.pinimg.com/236x/af/9e/51/af9e515423206576881894090b670c32.jpg" },
    { id: 5, name: "Dining Table", price: 799.99, description: "Solid wood, seats four.", image: "https://i.pinimg.com/236x/a1/a2/34/a1a234db1194f846a6285d679654fed9.jpg" },
    { id: 6, name: "Leather Recliner", price: 699.99, description: "Luxury and comfort in one.", image: "https://i.pinimg.com/736x/00/98/f1/0098f1915496369afb4af8fd1a1fcf78.jpg" },
    { id: 7, name: "Modern Bed", price: 899.99, description: "Solid wood, comfy headboard.", image: "https://i.pinimg.com/236x/9b/34/fc/9b34fc0e416849c17e63ffa0cef8e402.jpg" },
    { id: 8, name: "Elegant Wardrobe", price: 159.99, description: "Solid wood, sliding door.", image: "https://i.pinimg.com/enabled_lo/564x/fb/10/2f/fb102f49ec97df9c6833bcc25b118d9c.jpg" },
    { id: 9, name: "Wooden Shoe rack", price: 200.99, description: "Solid wood, spaceous.", image: "https://i.pinimg.com/564x/92/cc/18/92cc18c6c5ef477085a51a8f2010959d.jpg" },
    { id: 10, name: "Flower Vases", price: 459.99, description: "Soft velvet feel.", image: "https://i.pinimg.com/564x/ec/22/0c/ec220cb86fff0a8a2be73c4d4c0adaa8.jpg" },
  ];

  

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 m-4 w-72">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <button
                onClick={() => toggleLike(index)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  likedItems[index] ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                {likedItems[index] ? '❤️' : '♡'}
              </button>
            </div>

            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">{product.description}</p>

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

            <button
              className="mt-4 bg-green-300 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
              onClick={() => addToCart(product)} // Add the product to cart
            >
              Add to Cart
            </button>
            </div>
        ))}
          </div>
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

export default Furniture;
