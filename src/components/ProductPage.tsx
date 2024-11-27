import React from "react";

interface ProductPageProps {
  imageUrl: string;
  images: string[]; // Массив изображений для галереи
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  numReviews: number;
  description: string;
  colors: { name: string; hex: string }[]; // Доступные цвета
}

const ProductPage: React.FC<ProductPageProps> = ({
  imageUrl,
  images,
  title,
  price,
  oldPrice,
  discount,
  rating,
  numReviews,
  description,
  colors,
}) => {
  return (
    <div className="wrapper min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        {/* Галерея изображений */}
        <div className="flex-1">
          <img
            src={imageUrl}
            alt="Product"
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="mt-4 flex gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover rounded-lg cursor-pointer border border-gray-300 hover:border-purple-500"
              />
            ))}
          </div>
        </div>

        {/* Детали товара */}
        <div className="flex-1 space-y-6">
          {/* Название и рейтинг */}
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-lg">{rating} ★</span>
              <span className="ml-2 text-sm text-gray-500">({numReviews} отзывов)</span>
            </div>
          </div>

          {/* Цена и скидка */}
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-900">{price} ₽</span>
            {oldPrice && (
              <span className="ml-4 text-lg text-gray-500 line-through">{oldPrice} ₽</span>
            )}
            {discount && (
              <span className="ml-4 bg-red-600 text-white text-sm font-medium px-2 py-0.5 rounded">
                {discount}
              </span>
            )}
          </div>

          {/* Описание */}
          <p className="text-gray-700">{description}</p>

          {/* Выбор цвета */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Выберите цвет:</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                ></div>
              ))}
            </div>
          </div>

          {/* Кнопка */}
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium py-3 rounded-lg">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
