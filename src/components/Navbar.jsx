import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

const Navbar = () => {
  const { user, logout, loading } = useUser();

  return (
    <nav className="bg-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MyShop
        </Link>

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-white hover:text-gray-200 transition font-medium"
          >
            Cart
          </Link>

          {/* Show User Info & Logout if logged in */}
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <p className="text-white font-medium">
                {user.name} ({user.email})
              </p>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded text-white font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-gray-200 transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
