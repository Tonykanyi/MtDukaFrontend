import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [salesData, setSalesData] = useState([]);
  const [newSale, setNewSale] = useState({ product_id: '', quantity: '' });
  const [productData, setProductData] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(false); // Added this line

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to landing page
  };

  // Handle adding a new sale
  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/sales', newSale); // Changed to http
      console.log(response.data);
      setSalesData([...salesData, response.data]); // Use the response to get the correct ID
      setNewSale({ product_id: '', quantity: '' }); // Reset form
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };
  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales'); // Changed to http
      setSalesData(response.data);
      

    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.price || isNaN(newProduct.price)) {
      alert("Please provide a valid product name and price.");
      return;
    }
    
    try {
      setLoading(true); // Set loading state
      const response = await axios.post('http://localhost:5000/api/products', newProduct); // Changed to http
      setProductData([...productData, response.data]);
      setNewProduct({ name: '', description: '', price: '', category: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  useEffect(() => {
    const fetchpayments = async () => {
      const response = await axios.get('http://localhost:5000/api/mpesa/payment'); // Changed to http
      setPaymentsData(response.data);
    }
    fetchpayments();
  })
  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Changed to http
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-200 p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <div className="mb-4">
          <button
            className={`block w-full text-left mb-2 ${activeTab === 'sales' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales
          </button>
          <button
            className={`block w-full text-left mb-2 ${activeTab === 'addProducts' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('addProducts')}
          >
            Add Products
          </button>
          <button
            className={`block w-full text-left mb-2 ${activeTab === 'payments' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>
        <button className="bg-green-500 hover:bg-green-600 rounded-md text-white py-2 px-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="w-4/5 p-4">
        {activeTab === 'sales' && (
          <div>
            <h2 className="text-2xl mb-4">Sales</h2>
            <form onSubmit={handleAddSale} className="mb-4">
              <input
                type="number"
                placeholder="Product ID"
                value={newSale.product_id}
                onChange={(e) => setNewSale({ ...newSale, product_id: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newSale.quantity}
                onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4">Add Sale</button>
            </form>
            <h3 className="text-xl mt-4">Sales Data</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Product ID</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id}>
                    <td className="border border-gray-300 px-4 py-2">{sale.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.product_id}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addProducts' && (
          <div>
            <h2 className="text-2xl mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct} className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              />
              <button type="submit" className="bg-green-400 hover:bg-green-500 rounded-md text-white py-2 px-4">Add Product</button>
            </form>
            <h3 className="text-xl mt-4">Products</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product) => (
                  <tr key={product.id} className={`${productData.indexOf(product) % 2 === 0 ? 'bg-gray-100' : 'bg-white: bg-green-200'}`}>
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h2 className="text-2xl mb-4">Payments</h2>
            {/* Payment form can be added here */}
            <h3 className="text-xl mt-4">Payments</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Product ID</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id}>
                    <td className="border border-gray-300 px-4 py-2">{sale.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.product_id}</td>
                    <td className="border border-gray-300 px-4 py-2">{sale.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
