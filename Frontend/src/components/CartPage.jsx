import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/cart/${userId}`);
        setCart(response.data);
        calculateTotal(response.data.books);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const calculateTotal = (books) => {
      if (!books) return;
      let totalAmount = 0;
      books.forEach((book) => {
        totalAmount += book.price;
      });
      setTotal(totalAmount);
    };

    fetchCart();
  }, [userId]);

  if (!cart) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (<>
    <Navbar/>
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mt-4 mb-6">Your Cart</h1>

        <div className="bg-slate-800 shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cart.books.map((book) => (
              <li
                key={book._id}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center">
                  <img
                    src={`/images/${book.image}`}
                    alt={book.title}
                    className="w-16 h-20 object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-200">
                      {book.name}
                    </h2>
                    
                  </div>
                </div>
                <div className="text-gray-200 font-medium">
                  ${book.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition duration-300">
          Proceed to Checkout
          

        </button>
      </div>
    </div>
    </>
  );
};

export default CartPage;
