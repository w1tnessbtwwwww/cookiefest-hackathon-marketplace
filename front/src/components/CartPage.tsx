import axios from "axios";
import React, { useEffect, useState } from "react";
import { productNewType } from "../types";
import baseUrl from "../baseurl";
import { getTokenFromCookie, getIdFromToken } from "./getToken";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<productNewType[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const token = getTokenFromCookie("jwt_token");
    if (token) {
      const id = getIdFromToken(token);
      if (id !== null) {
        setUserId(id);
        console.log(userId);
      } else {
        console.error("Failed to extract ID from token");
      }
    } else {
      console.error("Token not found in cookies");
    }

    const articuls = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(articuls);

    const fetchProducts = async () => {
      try {
        const prodArray: productNewType[] = [];
        for (const articul of articuls) {
          const response = await axios.get(
            `${baseUrl()}/v1/items/getitems/${articul}`
          );
          prodArray.push({ ...response.data, quantity: 1 }); // Устанавливаем количество по умолчанию равным 1
        }
        setCartItems(prodArray);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleRemove = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.articul !== id);
    setCartItems(updatedCartItems);

    // Обновление localStorage
    const updatedArticuls = updatedCartItems.map((item) => item.articul);
    localStorage.setItem("cart", JSON.stringify(updatedArticuls));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.articul === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleOrder = () => {
    if (isAuthenticated) {
      const postOrders = async () => {
        try {
          cartItems.map(async (product) => {
            const articul = product.articul;
            const response = await axios.post(
              `${baseUrl()}/v1/orders/createorder`,
              { articul, userId },
              {
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response);
          });
        } catch (err) {
          console.log(err);
        }
      };
      postOrders();
    }
    else navigate('/auth/login')
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingEstimate = 5.0;
  const taxEstimate = subtotal * 0.1; // Пример 10% налог
  const total = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Корзина покупок</h1>
      {cartItems.length === 0 ? (
        <div>Пусто</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Список товаров */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.articul}
                className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm font-medium text-primary-700">
                      {item.price} ₽
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Уменьшение количества */}
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.articul,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border rounded">
                    {item.quantity}
                  </span>
                  {/* Увеличение количества */}
                  <button
                    onClick={() =>
                      handleQuantityChange(item.articul, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  {/* Удаление товара */}
                  <button
                    onClick={() => handleRemove(item.articul)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Итоги заказа */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Рассчетная стоимость
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Товар</span>
                <span className="text-sm text-gray-800">
                  {subtotal.toFixed(2)} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Доставка</span>
                <span className="text-sm text-gray-800">
                  {shippingEstimate.toFixed(2)} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Налог</span>
                <span className="text-sm text-gray-800">
                  {taxEstimate.toFixed(2)} ₽
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>{total.toFixed(2)} ₽</span>
              </div>
            </div>
            <button
              id="order-button"
              className="w-full bg-primary-700 hover:bg-primary-800 text-white py-2 rounded-lg mt-6"
              onClick={handleOrder}
            >
              Заказать
            </button>
            <div className="flex items-center mt-6">
              <input
                id="terms-checkbox"
                type="checkbox"
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label
                htmlFor="terms-checkbox"
                className="ml-2 text-sm text-gray-700"
              >
                Соглашаюсь с{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  правилами пользования торговой площадкой
                </a>{" "}
                и возврата
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
