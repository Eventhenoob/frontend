import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 capitalize">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 text-lg font-semibold text-gray-800">
          ${product.cost}
        </p>
        <p className="mt-1 text-yellow-500">⭐ {product.rating}/5</p>
      </div>
    </div>
  );
};

export default ProductCard;
