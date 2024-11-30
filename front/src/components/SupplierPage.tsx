import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface SupplierPage {
    id: number;
    store: string;
    price: number;
    delivery: string;
    rating: number;
    reviews: number;
}

const mockOffers: SupplierPage[] = [
    {
        id: 1,
        store: "TishkaShop",
        price: 6498,
        delivery: "1",
        rating: 4.8,
        reviews: 180,
    },
    {
        id: 2,
        store: "T-shop",
        price: 6498,
        delivery: "5",
        rating: 4.5,
        reviews: 120,
    },
    {
        id: 3,
        store: "TS",
        price: 24465,
        delivery: "10",
        rating: 4.9,
        reviews: 4000,
    },
];

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

const SupplierPage = () => {
    const { id } = useParams<{ id: string }>();
    const [offers, setOffers] = useState<SupplierPage[]>(mockOffers);
    const [deliveryFilter, setDeliveryFilter] = useState<string>("any"); // По умолчанию "Любая"
    const [minPrice, setMinPrice] = useState<number>(0); // Цена от 0
    const [maxPrice, setMaxPrice] = useState<number>(
        Math.max(...mockOffers.map((offer) => offer.price))
    ); // Максимальная цена по умолчанию
    const [ratingFilter, setRatingFilter] = useState<string>("3.5"); // Рейтинг от 3.5
    const [activeFilter, setActiveFilter] = useState<string>("popular"); // Фильтр "Популярные" по умолчанию

    const filterOffers = () => {
        let filteredOffers = [...mockOffers];

        // Фильтрация по сроку доставки
        if (deliveryFilter) {
            filteredOffers = filteredOffers.filter((offer) => {
                if (deliveryFilter === "1-2") return parseInt(offer.delivery) <= 2;
                if (deliveryFilter === "up-to-5") return parseInt(offer.delivery) <= 5;
                if (deliveryFilter === "any") return true;
                return true;
            });
        }

        // Фильтрация по цене
        if (minPrice !== null) {
            filteredOffers = filteredOffers.filter((offer) => offer.price >= minPrice);
        }
        if (maxPrice !== null) {
            filteredOffers = filteredOffers.filter((offer) => offer.price <= maxPrice);
        }

        // Фильтрация по рейтингу
        if (ratingFilter) {
            filteredOffers = filteredOffers.filter((offer) => offer.rating >= parseFloat(ratingFilter));
        }

        // Сортировка по выбранному фильтру
        if (activeFilter === "popular") {
            filteredOffers.sort((a, b) => b.reviews - a.reviews); // Сортировка по количеству отзывов
        } else if (activeFilter === "cheaper") {
            filteredOffers.sort((a, b) => a.price - b.price);
        } else if (activeFilter === "expensive") {
            filteredOffers.sort((a, b) => b.price - a.price);
        } else if (activeFilter === "bestRating") {
            filteredOffers.sort((a, b) => b.rating - a.rating);
        }

        setOffers(filteredOffers);
    };

    useEffect(() => {
        filterOffers();
    }, [deliveryFilter, minPrice, maxPrice, ratingFilter, activeFilter]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Футболка Ticle</h1>

            {/* Кнопки для фильтрации */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-md ${activeFilter === "popular" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveFilter("popular")}
                >
                    Популярные
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeFilter === "cheaper" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveFilter("cheaper")}
                >
                    Подешевле
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeFilter === "expensive" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveFilter("expensive")}
                >
                    Подороже
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeFilter === "bestRating" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveFilter("bestRating")}
                >
                    С лучшей оценкой
                </button>
            </div>

            <div className="flex space-x-6">
                {/* Блок фильтров справа */}
                <div className="w-1/4 p-4 bg-white rounded-lg shadow-md h-[415px] min-w-[250px] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Фильтры</h2>

                    {/* Фильтр по сроку доставки */}
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Срок доставки</h3>
                        <button
                            className={`w-full px-4 py-2 mb-2 rounded-md ${deliveryFilter === "1-2" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => setDeliveryFilter("1-2")}
                        >
                            1-2 дня
                        </button>
                        <button
                            className={`w-full px-4 py-2 mb-2 rounded-md ${deliveryFilter === "up-to-5" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => setDeliveryFilter("up-to-5")}
                        >
                            До 5 дней
                        </button>
                        <button
                            className={`w-full px-4 py-2 mb-2 rounded-md ${deliveryFilter === "any" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => setDeliveryFilter("any")}
                        >
                            Любая
                        </button>
                    </div>

                    {/* Фильтр по ценовому диапазону */}
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Цена</h3>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="w-1/2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                                placeholder="От"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
                            />
                            <input
                                type="number"
                                className="w-1/2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                                placeholder="До"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Math.max(minPrice, Number(e.target.value)))}
                            />
                        </div>
                    </div>

                    {/* Фильтр по рейтингу */}
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Рейтинг поставщика</h3>
                        <select
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value || null)}
                        >
                            <option value="3.5">3.5+</option>
                            <option value="4.0">4.0+</option>
                            <option value="4.5">4.5+</option>
                        </select>
                    </div>
                </div>

                {/* Список предложений */}
                <div className="w-3/4 space-y-4">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="Товар"
                        className="rounded-lg shadow-md mx-auto mb-4"
                    />
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{offer.store}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <p>Доставка: {offer.delivery} дней</p>
                                    <p>• Рейтинг: {offer.rating}</p>
                                    <p>• Отзывы: {offer.reviews}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold text-primary-700">{offer.price} ₽</p>
                                <button
                                    className="px-4 py-2 bg-primary-700 text-white rounded-md"
                                    onClick={handleAddToCart}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SupplierPage;
