import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://server-eyev.onrender.com/verse/products"
        );
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-6">
        <h1 className="text-4xl font-bold">Welcome to ShopEase</h1>
        <p className="mt-2 text-lg">Your one-stop shop for amazing products!</p>
      </header>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Browse our curated collection of products!
          </p>

          {loading && <p className="text-gray-600 mt-4">Loading products...</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading &&
              !error &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Shop?</h2>
          <p className="mt-4 text-lg">
            Add your favorite products to the cart and checkout!
          </p>
          <Link
            to="/cart"
            className="mt-6 inline-block bg-yellow-500 text-gray-800 text-xl font-semibold py-3 px-8 rounded-lg hover:bg-yellow-600"
          >
            Go to Cart
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-4 mt-8">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
