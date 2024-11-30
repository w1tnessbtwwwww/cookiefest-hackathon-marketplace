import Swal from "sweetalert2";
import ReviewsSection from "./ReviewsSection"; // Импортируем компонент с отзывами
import { Product } from "../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OffersButton from "./OffersButton";

// interface ProductPageProps {
//     product: {
//         imagesByColor: { [colorName: string]: string[] };
//         title: string;
//         price: number;
//         oldPrice?: number;
//         discount?: string;
//         rating: number;
//         numReviews: number;
//         description: string;
//         colors: { name: string; hex: string }[];
//     }
// }

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product["product"] | null>(null)
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        //здесь приебенить загрузку с бэка
        const product1 = {
            id: 1,
            imagesByColor: {
                Black: ['https://optim.tildacdn.com/tild3032-3364-4166-b538-646366303863/-/format/webp/2_29.jpg', 'https://optim.tildacdn.com/tild6162-3437-4461-a436-333562616235/-/format/webp/3_33.jpg', 'https://optim.tildacdn.com/tild3433-3061-4332-a239-353861666635/-/format/webp/4_37.jpg'],
                White: ['https://optim.tildacdn.com/tild3439-3137-4263-a266-316232396330/-/format/webp/2_28.jpg', 'https://optim.tildacdn.com/tild6661-6262-4661-a261-666366396662/-/format/webp/4_36.jpg', 'https://optim.tildacdn.com/tild3639-6363-4738-b934-303362396132/-/format/webp/5_27.jpg'],
                Beige: ['https://optim.tildacdn.com/tild3632-3030-4263-b038-336461666339/-/format/webp/2_30.jpg', 'https://optim.tildacdn.com/tild3166-3039-4333-b764-626133643433/-/format/webp/5_29.jpg', 'https://optim.tildacdn.com/tild3662-3761-4563-b434-613363386664/-/format/webp/4_38.jpg'],
            },
            title: "Футболка Ticle",
            price: 1620,
            oldPrice: 4960,
            discount: "-67%",
            rating: 4.8,
            numReviews: 31601,
            description: `
              Футболка оверсайз из плотного хлопка.
              Состав и уход:
              - Хлопок 100%
              - Бережная стирка на 30°
              - Отжим и сушка запрещена
              - Не отбеливать
          
              На моделе размер: L
              Параметры модели: рост: 180 | 108-76-110
            `,
            colors: [
                { name: 'Black', hex: '#000000' },
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Beige', hex: '#EED9C4' },
            ],
        };
        setProduct(product1)
    }, [id])
    const sizes = ["S", "M", "L", "XL"];
    if (!product) {
        return <div>Loading...</div>;
    }

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
            customClass: {
                title: 'text-primary-900', // Красный цвет заголовка
                content: 'text-black' // Черный цвет текста
            }
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
                                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${currentImageIndex === index ? "border-primary-800" : "border-transparent"
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
                                    className={`w-8 h-8 rounded-full border-2 focus:outline-none ${activeColorIndex === index ? "border-primary-800" : "border-transparent"
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
                                        ? "border-primary-700 bg-primary-700 text-white"
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

            <div className="my-8">
                <OffersButton
                    // ПОМЕТКА ДОРАБОТАТЬ
                    id={product.id}
                    imageSrc="https://optim.tildacdn.com/tild6162-3437-4461-a436-333562616235/-/format/webp/3_33.jpg"
                    offerCount={3}
                />
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
