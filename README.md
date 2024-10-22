# MyDukaFrontend
Welcome to my MyDuka Platform , a responsive web application built with React that provides users with an intuitive online shopping experience. The platform includes both user and admin functionality, user authentication, product browsing, cart management, and seamless payment options via Cash on Delivery or M-Pesa.

# Project overview
This project represents the frontend of an e-commerce platform. The platform allows users to browse product categories, manage their shopping carts, and make purchases. Admin users can add new products, track sales, and manage payments.

## Features
1. AdminDashboard

- Sales: View sales performance and transactions.
- Add Product: Allows admin users to add new products to the platform.
- Payment: Admins can track all payments made, including via M-Pesa


2. User Authentication

- Sign Up & Login: Provides user and admin authentication using Firebase.
- Role-Based Access: After login, users are directed to their respective dashboards (User or Admin)

3. Add To Cart

- Product Addition: Users can add products to their cart.
- Cart Management: View and manage items in the cart.
- Payment Options: Choose to pay with either Cash on Delivery or M-Pesa

4. UserDashboard

- Landing Page: The homepage for users to view featured products.
- Category Browser: Allows users to browse products by categories, including Furniture, Shoes, Clothes, Tech, and Bags

## Installation
### prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps to run the app
1. Clone the repository:

git clone https://github.com/Tonykanyi/MyDukaFrontend/

2. Navigate to the project directory:

cd MyDukaFrontend

3. Install the dependencies:

npm install

4. Start the development server:

npm run dev
5. Open your browser and go to:

http://localhost:5173

## Usage

Admin Panel: Login as an admin to add products, view sales, and manage payments.
User Dashboard: Users can browse products by category, add items to the cart, and make purchases using the available payment methods.
Authentication: Use Firebase for login and signup. Both admins and users have different access levels based on their roles.
Payments: Complete payments with Cash on Delivery or M-Pesa.

## Technologies Used

- React: Frontend JavaScript library for building user interfaces.
- Firebase: For user authentication and real-time database.
- Tailwind CSS: For responsive and modern UI design.
- M-Pesa API: To handle mobile payments.
- Vite: Fast build tool for frontend development.
- PWA
- Docker

# License
This project is licensed under the MIT License. See the LICENSE file for more details