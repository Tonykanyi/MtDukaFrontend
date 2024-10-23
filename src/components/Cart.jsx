import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart(); // Added clearCart function
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState({});
  const [showPaymentOptions, setShowPaymentOptions] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});

  const handleOrderNowClick = (index) => {
    setShowPaymentOptions((prevOptions) => ({
      ...prevOptions,
      [index]: !prevOptions[index],
    }));
  };

  const handlePaymentChange = (index, option) => {
    setPaymentOption((prevOptions) => ({
      ...prevOptions,
      [index]: option,
    }));
  };

  const handlePhoneNumberChange = (index, value) => {
    setPhoneNumber((prevNumbers) => ({
      ...prevNumbers,
      [index]: value,
    }));
  };

  const handleMpesaPayment = async (index) => {
    const phone = phoneNumber[index];
    const phoneRegex = /^254[0-9]{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      alert("Please enter a valid Kenyan phone number starting with 254...");
      return;
    }
    const convertedPhone = phone.startsWith('07') ? `254${phone.slice(1)}` : phone;

    try {
      const response = await axios.post('https://e7af-41-90-181-60.ngrok-free.app/api/mpesa/payment', {
        amount: 1,
        phone: convertedPhone,
      });

      if (response.data.success) {
        alert(`Payment request sent. You will receive a prompt on your phone.`);
      } else {
        alert(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleBackToDashboard = () => {
    navigate('/user');
  };

  return (
    <div className= "container mx-auto mt-8 ">
      <div className= "flex justify-between items-center">
        <h2 className= "text-5xl font-bold text-green-900 underline">WISHLIST</h2>
        {cart.length > 0 && (
          <button
            className= "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={clearCart} // Call clearCart to remove all items
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className= "mt-4">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">${item.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>

              <button
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                onClick={() => handleOrderNowClick(index)}
              >
                Order Now
              </button>

              {showPaymentOptions[index] && (
                <div className="mt-4">
                  <h4 className="text-md font-bold">Select Payment Method:</h4>
                  <div className="flex flex-col">
                    <label>
                      <input
                        type="radio"
                        name={`payment-${index}`}
                        value="mpesa"
                        checked={paymentOption[index] === "mpesa"}
                        onChange={() => handlePaymentChange(index, "mpesa")}
                      />
                      M-Pesa
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`payment-${index}`}
                        value="creditCard"
                        checked={paymentOption[index] === "creditCard"}
                        onChange={() => handlePaymentChange(index, "creditCard")}
                      />
                      Cash on Delivery
                    </label>
                  </div>

                  {paymentOption[index] === "mpesa" && (
                    <div className="mt-4">
                      <label className="block mb-2">Enter your phone number:</label>
                      <input
                        type="text"
                        className="border rounded p-2 w-full"
                        placeholder="e.g., 254701234567"
                        value={phoneNumber[index] || ''}
                        onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                      />
                      <button
                        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                        onClick={() => handleMpesaPayment(index)}
                      >
                        Pay with M-Pesa
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleBackToDashboard}
        className= "mt-6 bg-green-500 rounded-md hover:bg-green-700 text-white py-2 px-4 "
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Cart;
