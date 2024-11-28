import React, { useState } from "react";
import Swal from "sweetalert2";
import ReviewsSection from "./ReviewsSection"; // Импортируем компонент с отзывами

interface ProductPageProps {
    product: {
      imagesByColor: { [colorName: string]: string[] };
      title: string;
      price: number;
      oldPrice?: number;
      discount?: string;
      rating: number; // Рейтинг из App.tsx
      numReviews: number;
      description: string;
      colors: { name: string; hex: string }[];
    };
    reviews: { name: string; rating: number; comment: string }[]; // Отзывы
  }

const ProductPage: React.FC<ProductPageProps> = ({ product, re }) => {
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const sizes = ["S", "M", "L", "XL"];
    const currentImages = product.imagesByColor[product.colors[activeColorIndex].name];

    const reviews = [
        { name: "Толстов Марк", rating: 5, comment: "Норм, всегда беру" },
        { name: "Михалев Тимур", rating: 5, comment: "dumpling" },
        { name: "Лашков Максим", rating: 4, comment: "Хорошая тишка, но антитер лучше.." },
        // Добавьте больше отзывов, если нужно
    ];

    // Рассчитываем средний рейтинг
    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Функции для управления действиями
    const handleImageChange = (index: number) => setCurrentImageIndex(index);
    const handleColorChange = (index: number) => {
        setActiveColorIndex(index);
        setCurrentImageIndex(0);
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
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex">
                {/* Левая часть */}
                <div className="flex-1">
                    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={currentImages[currentImageIndex]}
                            alt={`Product image ${currentImageIndex + 1}`}
                            className="object-contain w-full h-full"
                        />
                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1))}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
                        >
                            ❮
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0))}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
                        >
                            ❯
                        </button>
                    </div>
                    <div className="flex justify-center mt-4 space-x-2">
                        {currentImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${currentImageIndex === index ? "border-[#5e5f9c]" : "border-transparent"
                                    }`}
                                onClick={() => handleImageChange(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Правая часть */}
                <div className="flex-1 ml-8">
                    <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                    <div className="mt-2 flex items-center space-x-4">
                        <span className="text-xl font-bold text-gray-900">{product.price} ₽</span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-500 line-through">{product.oldPrice} ₽</span>
                        )}
                        {product.discount && (
                            <span className="text-sm bg-red-600 text-white px-2 py-1 rounded">{product.discount}</span>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500 font-medium">{product.rating}</span>
                        <span className="ml-2 text-sm text-gray-500">({product.numReviews} отзывов)</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{product.description}</p>

                    {/* Выбор цвета */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700">Цвет:</h3>
                        <div className="mt-2 flex space-x-4">
                            {product.colors.map((color, index) => (
                                <button
                                    key={color.name}
                                    onClick={() => handleColorChange(index)}
                                    className={`w-8 h-8 rounded-full border-2 focus:outline-none ${activeColorIndex === index ? "border-[#5e5f9c]" : "border-transparent"
                                        } ${color.name === "White" ? "shadow-md shadow-gray-500" : ""}`}
                                    style={{ backgroundColor: color.hex }}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Выбор размера */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700">Размер:</h3>
                        <div className="mt-2 flex space-x-4">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-medium ${selectedSize === size
                                            ? "border-[#5e5f9c] bg-[#5e5f9c] text-white"
                                            : "border-transparent text-gray-700"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка добавления в корзину */}
                    <button
                        className="mt-8 w-full bg-primary-700 hover:bg-primary-900 text-white text-sm font-medium py-2 rounded-lg"
                        onClick={handleAddToCart}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>

            {/* Секция отзывов */}
            <ReviewsSection
                reviews={reviews}
                averageRating={averageRating} // Используем этот рейтинг
                totalReviews={reviews.length}
            />

        </div>
    );
};

export default ProductPage;
