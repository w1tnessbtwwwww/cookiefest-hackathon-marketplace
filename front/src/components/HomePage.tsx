import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "../types";
import baseUrl from "../baseurl";
import { useAuth } from "./auth/AuthProvider";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function HomePage() {
    const [data, setData] = useState<ProductCardProps["product"][]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [report, setReport] = useState("");
    const [messages, setMessages] = useState<string[]>(["Добро пожаловать! Как мы можем помочь?"]);
    const { isAuthenticated } = useAuth()
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(()=>{
        try{
            const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                const [key, value] = cookie.split("=");
                acc[key] = decodeURIComponent(value || "");
                return acc;
            }, {} as Record<string, string>);
        
            const rawToken = cookies["jwt_token"];
        
            const decodedToken: { [key: string]: any } = jwtDecode(rawToken);
            setUserId(decodedToken.id);
        } catch (err) {
            console.log(err)
        }
    }, [isAuthenticated])
    

    useEffect(() => {
        fetch(`${baseUrl()}/v1/items/getshop`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, []);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const handleSendMessage = () => {
        if (report.trim()) {
            setMessages((prevMessages) => [...prevMessages, report]);
            setReport("");
            const postMessage = async () => {
                try {
                    console.log(userId)
                    const response = await axios.post(
                        `${baseUrl()}/v1/ticket/create`,
                        { userId, report },
                        {
                            headers: {
                              accept: "application/json",
                              "Content-Type": "application/json",
                            },
                        }
                    );
                    if(response) alert('nice')
                    else alert('oh no')
                } catch (err) {
                    console.log(err.response.data)
                }
            }
            postMessage()
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
            {isAuthenticated ? <button
                onClick={toggleChat}
                className="fixed bottom-5 right-5 bg-primary-800 text-white p-3 rounded-full shadow-lg hover:bg-primary-500 focus:outline-none flex items-center justify-center"
            >
                {isChatOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                    </svg>
                )}
            </button> : <div />}



            {/* Модальное окно чата */}
            {isAuthenticated && isChatOpen && (
                <div className="fixed bottom-20 right-5 w-72 bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-300 bg-primary-000">
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
                            value={report}
                            onChange={(e) => setReport(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-primary-800"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-primary-800 text-white p-3 rounded-full hover:bg-primary-500 focus:outline-none flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
