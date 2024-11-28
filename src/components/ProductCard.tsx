import React from 'react';
import { productProps } from '../types';

// interface ProductCardProps {
//   product: {
//     imageUrl: string;
//     title: string;
//     price: string;
//     oldPrice?: string;
//     discount?: string;
//     rating: number;
//     numReviews: number;
//   }
// }

const ProductCard: React.FC<productProps> = ({ product }) => {
  return (
    <a
      href="#"
      className="w-72 m-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 no-underline"
    >
      <div className="relative">
        <img
          className="w-full h-80 object-cover rounded-b-2xl"
          src={product.imagesByColor[product.colors[0].name][0]}
          alt="product"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {product.discount}
          </span>
        )}
        {/* Якорь на сердечке */}
        <a
          href="#"
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </a>
      </div>
      <div className="p-4">
        <h5 className="text-sm font-semibold text-gray-800 truncate">{product.title}</h5>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm font-medium">{product.rating}</span>
          <span className="ml-2 text-xs text-gray-500">({product.numReviews} оценок)</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold text-gray-900">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">{product.oldPrice} ₽</span>
          )}
        </div>
        <button className="mt-4 w-full bg-[#5e5f9c] hover:bg-[#4a4b7a] text-white text-sm font-medium py-2 rounded-lg">
          Добавить в корзину
        </button>
      </div>
    </a>
  );
};

export default ProductCard;



