import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "../types";

export default function HomePage() {
    const [data, setData] = useState<ProductCardProps["product"][]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState<string[]>(["Добро пожаловать! Как мы можем помочь?"]);

    useEffect(() => {
        fetch("http://172.20.10.3:8008/v1/items/getshop")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, []);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setUserMessage("");
        }
    };

    return (
        <div className="relative wrapper pl-5 pr-5">
            {/* Карточки продуктов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {data.map((product) => (
                    <ProductCard key={product.articul} product={product} />
                ))}
            </div>

            {/* Кнопка открытия чата */}
            <button
                onClick={toggleChat}
                className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
            >
                {isChatOpen ? "Закрыть чат" : "Открыть чат"}
            </button>

            {/* Модальное окно чата */}
            {isChatOpen && (
                <div className="fixed bottom-20 right-5 w-72 bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-300 bg-blue-100">
                        <h3 className="text-lg font-semibold">Поддержка</h3>
                    </div>
                    <div className="p-4 max-h-60 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className="mb-2 text-sm text-gray-800">
                                {message}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-300 flex items-center">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
