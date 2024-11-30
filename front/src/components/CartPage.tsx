import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  stockStatus: string; // 'in stock' или 'ships in 3–4 weeks'
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Футболка',
    color: 'Синяя',
    size: 'XL',
    price: 32.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'Будет доставлено через 3 дня',
  },
  {
    id: 2,
    name: 'Рубашка',
    color: 'Черная',
    size: 'XL',
    price: 32.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'Будет доставлено через 3 дня',
  },
  {
    id: 3,
    name: 'Кепка',
    color: 'Белая',
    size: 'L',
    price: 35.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'Доставлено',
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingEstimate = 5.0;
  const taxEstimate = subtotal * 0.1; // Пример 10% налог
  const total = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Корзина покупок</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список товаров */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-sm font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                  <p className="text-sm font-medium text-primary-700">{item.price} ₽</p>
                  <p
                    className={`text-sm ${item.stockStatus === 'in stock' ? 'text-green-500' : 'text-gray-500'
                      }`}
                  >
                    {item.stockStatus === 'in stock' ? 'In stock' : 'Ships in 3–4 weeks'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Уменьшение количества */}
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-1 border rounded">{item.quantity}</span>
                {/* Увеличение количества */}
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                {/* Удаление товара */}
                <button
                  onClick={() => handleRemove(item.id)}
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
          <h2 className="text-lg font-bold text-gray-900 mb-4">Рассчетная стоимость</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Товар</span>
              <span className="text-sm text-gray-800">{subtotal.toFixed(2)} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Доставка</span>
              <span className="text-sm text-gray-800">{shippingEstimate.toFixed(2)} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Налог</span>
              <span className="text-sm text-gray-800">{taxEstimate.toFixed(2)} ₽</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Итого</span>
              <span>{total.toFixed(2)} ₽</span>
            </div>
          </div>
          <button
            id="order-button"
            className="w-full bg-primary-700 hover:bg-primary-800 text-white py-2 rounded-lg mt-6"
          >
            Заказать
          </button>

          <div className="flex items-center mt-6">
            <input
              id="terms-checkbox"
              type="checkbox"
              className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-700">
              Соглашаюсь с{' '}
              <a href="#" className="text-purple-600 hover:underline">
                правилами пользования торговой площадкой
              </a>{' '}
              и возврата
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
