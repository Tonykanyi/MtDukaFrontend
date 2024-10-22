import React, { useState } from 'react';
import { useCart } from './CartContext'; // Import the cart context
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const Cart = () => {
  const { cart } = useCart(); // Get the cart array from context
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState({});
  const [showPaymentOptions, setShowPaymentOptions] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({}); // State for user input phone number

  const handleOrderNowClick = (index) => {
    setShowPaymentOptions((prevOptions) => ({
      ...prevOptions,
      [index]: !prevOptions[index], // Toggle the dropdown for payment options
    }));
  };

  const handlePaymentChange = (index, option) => {
    setPaymentOption((prevOptions) => ({
      ...prevOptions,
      [index]: option, // Set the selected payment option
    }));
  };

  const handlePhoneNumberChange = (index, value) => {
    setPhoneNumber((prevNumbers) => ({
      ...prevNumbers,
      [index]: value, // Update phone number for the specific index
    }));
  };

  const handleMpesaPayment = async (index) => {
    const phone = phoneNumber[index];

    // Validate the phone number (must be in 254XXXXXXXX format)
    const phoneRegex = /^254[0-9]{9}$/; // Updated regex to match 254XXXXXXXX format
    if (!phone || !phoneRegex.test(phone)) {
      alert("Please enter a valid Kenyan phone number starting with 254...");
      return;
    }

    // Convert phone number from 07XXXXXXXX to 254XXXXXXXX
    const convertedPhone = phone.startsWith('07') ? `254${phone.slice(1)}` : phone;

    try {
      // Call your backend to process the payment
      const response = await axios.post('http://localhost:5000/api/mpesa/payment', {
        amount: 1,
        phone: convertedPhone,
      });

      // Handle the response from the backend
      if (response.data.success) {
        alert(`Payment request sent. You will receive a prompt on your phone.`);
      } else {
        alert(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
    console.log('Amount:', 1);
    console.log('Phone:', convertedPhone);
  };

  // Function to navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/user'); // Adjust the path as needed
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold text-green-900">WISHLIST</h2>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">${item.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>

              {/* Order Now Button */}
              <button
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                onClick={() => handleOrderNowClick(index)}
              >
                Order Now
              </button>

              {/* Payment Options */}
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

                  {/* Phone Number Input */}
                  {paymentOption[index] === "mpesa" && (
                    <div className="mt-4">
                      <label className="block mb-2">Enter your phone number:</label>
                      <input
                        type="text"
                        className="border rounded p-2 w-full"
                        placeholder="e.g., 0701234567"
                        value={phoneNumber[index] || ''} // Use the state for the specific index
                        onChange={(e) => handlePhoneNumberChange(index, e.target.value)} // Update phone number for the specific index
                      />
                      <button
                        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                        onClick={() => handleMpesaPayment(index)} // Call payment function with the specific index
                      >
                        Pay with M-Pesa
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Back to Dashboard Button */}
      <button
        className="mt-6 bg-green-500 rounded-md hover:bg-green-700 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Cart;
