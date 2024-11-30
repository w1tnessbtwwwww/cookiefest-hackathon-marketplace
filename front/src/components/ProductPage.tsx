import Swal from "sweetalert2";
import ReviewsSection from "./ReviewsSection"; // Импортируем компонент с отзывами
import { ProductPageProps } from "../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OffersButton from "./OffersButton";
import axios from "axios";
import baseUrl from "../baseurl";

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
    const [product, setProduct] = useState<ProductPageProps | null>(null)
    // const [activeColorIndex, setActiveColorIndex] = useState(0);
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUrl()}/v1/items/getitems/${id}`); 
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct()
    }, [id])
    // const sizes = ["S", "M", "L", "XL"];
    if (loading) {
        return <div className="flex justify-center align-center size-full">
            <span >
                Loading...
            </span>
        </div>;
    }

    if (error || !product) {
        return <div className="flex justify-center align-center size-full">
            <span>
                Error: {error}
            </span>
        </div>;
    }

    // const currentImages = product.imagesByColor[product.colors[activeColorIndex].name];

    // const reviews = [
    //     { name: "Толстов Марк", rating: 5, comment: "Норм, всегда беру" },
    //     { name: "Михалев Тимур", rating: 5, comment: "dumpling" },
    //     { name: "Лашков Максим", rating: 4, comment: "Хорошая тишка, но антитер лучше.." },
    //     // Добавьте больше отзывов, если нужно
    // ];

    // Рассчитываем средний рейтинг
    // const averageRating =
    //     reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Функции для управления действиями
    // const handleImageChange = (index: number) => setCurrentImageIndex(index);
    // const handleColorChange = (index: number) => {
    //     setActiveColorIndex(index);
    //     setCurrentImageIndex(0);
    // };
    const handleAddToCart = () => {
        // Получаем текущую корзину из localStorage или создаем пустую
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      
        // Проверяем, есть ли уже товар в корзине
        const isItemInCart = currentCart.some((item: string) => item === id);
      
        if (!isItemInCart) {
          // Добавляем артикул товара в корзину
          currentCart.push(id);
      
          // Сохраняем обновленную корзину в localStorage
          localStorage.setItem("cart", JSON.stringify(currentCart));
      
          // Уведомление об успешном добавлении
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
              content: 'text-black', // Черный цвет текста
            },
          });
        } else {
          // Уведомление, если товар уже в корзине
          Swal.fire({
            title: "Этот товар уже в корзине!",
            text: "Вы можете добавить другой товар или проверить корзину.",
            icon: "info",
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            customClass: {
              title: 'text-primary-900', // Красный цвет заголовка
              content: 'text-black', // Черный цвет текста
            },
          });
        }
      };
      
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex">
                {/* Левая часть */}
                <div className="flex-1">
                    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album"
                            // alt={`Product image ${currentImageIndex + 1}`}
                            className="object-contain w-full h-full"
                        />
                        {/* <button
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
                        </button> */}
                    </div>
                    {/* <div className="flex justify-center mt-4 space-x-2">
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
                    </div> */}
                </div>

                {/* Правая часть */}
                <div className="flex-1 ml-8">
                    <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                    <div className="mt-2 flex items-center space-x-4">
                        <span className="text-xl font-bold text-gray-900">{product.price} ₽</span>
                        {product.salePrice && (
                            <span className="text-sm text-gray-500 line-through">{product.salePrice} ₽</span>
                        )}
                        {product.sale && (
                            <span className="text-sm bg-red-600 text-white px-2 py-1 rounded">–{product.sale}%</span>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500 font-medium">{product.rating}</span>
                        <span className="ml-2 text-sm text-gray-500">({product.reviews} отзывов)</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{product.description}</p>
                    <a href={product.url} target="_blank" className="text-primary-500 underline ">Перейти на сайт продавца</a>

                    {/* Выбор цвета */}
                    {/* <div className="mt-4">
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
                    </div> */}

                    {/* Выбор размера */}
                    {/* <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700">Размер:</h3>
                        <div className="mt-2 flex space-x-4">
                        <a href={product.url} target="_blank" rel="noopener noreferrer">Перейти на сайт продавца</a>

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
                    </div> */}

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
                    id={product.articul}
                    imageSrc="https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album"
                    offerCount={3}
                    // {product.merchantsIds.length}
                />
            </div>

            {/* Секция отзывов */}
            {/* <ReviewsSection
                reviews={product.reviews}
                averageRating={product.rating} 
                totalReviews={product.reviews.length}
            /> */}

        </div>
    );
};

export default ProductPage;
