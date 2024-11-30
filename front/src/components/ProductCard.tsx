import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Product } from '../types';
import { NavLink } from 'react-router-dom';

const ProductCard: React.FC<Product> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      Swal.fire({
        title: "Товар добавлен в избранное!",
        text: "Вы можете найти его в разделе избранных товаров.",
        icon: "success",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        customClass: {
          title: 'text-primary-900',
          content: 'text-black',
        },
      });
    }
  };

  const handleAddToCart = () => {
    Swal.fire({
      title: "Товар добавлен в корзину!",
      text: "Теперь вы можете перейти в корзину или продолжить покупки.",
      icon: "success",
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      customClass: {
        title: 'text-primary-900',
        content: 'text-black',
      },
    });
  };

  return (
    <div className="w-72 m-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* NavLink только вокруг изображения */}
      <NavLink to={`/productpage/${product.articul}`} className="block">
        <div className="relative">
          <img
            className="w-full h-80 object-cover rounded-b-2xl"
            src="https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album"
            // {product.imagesByColor[product.colors[0].name][0]}
            alt="product"
          />
          {product.sale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
              -{product.sale}%
            </span>
          )}
        </div>
      </NavLink>
      
      {/* Контент карточки */}
      <div className="p-4">
        <h5 className="text-sm font-semibold text-gray-800 truncate">{product.title}</h5>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm font-medium">{product.rating}</span>
          <span className="ml-2 text-xs text-gray-500">({product.numReviews} оценок)</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold text-gray-900">{product.price} ₽</span>
          {product.salePrice && (
            <span className="text-sm text-gray-500 line-through ml-2">{product.salePrice} ₽</span>
          )}
        </div>
        
        {/* Блок кнопок */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium py-2 rounded-lg mr-2"
          >
            Добавить в корзину
          </button>
          <button
            onClick={handleAddToFavorite}
            className={`text-sm transition-colors ${
              isFavorite
                ? 'text-primary-700'
                : 'text-gray-500 hover:text-primary-700'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? 'currentColor' : 'none'}
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
