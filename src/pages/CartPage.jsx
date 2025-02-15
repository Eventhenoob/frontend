import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8082/verse/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.response?.data?.message || "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = () => {
    alert("Checkout successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-12 flex justify-center">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

        {loading ? (
          <p className="text-center text-gray-700">Loading cart...</p>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : !cart || cart.cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty.</p>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">User:</span> {cart.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Payment Option:</span>{" "}
                {cart.paymentOption}
              </p>
            </div>

            <div className="space-y-6">
              {cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow"
                >
                  <img
                    src={
                      item.product.image || "https://via.placeholder.com/100"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold capitalize">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {item.product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rating: ⭐ {item.product.rating}/5
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${item.product.cost}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    x {item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
