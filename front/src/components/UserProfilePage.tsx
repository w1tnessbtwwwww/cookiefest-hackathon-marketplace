import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

interface profile {
  surname: string;
  name: string;
  patronymic: string;
  phoneNumber: string
}

const userInfo = {
  name: 'Иван Иванов',
  email: 'ivan.ivanov@example.com',
};

const favoriteItems = [
  {
    id: 1,
    name: 'Футболка',
    color: 'Синяя',
    size: 'L',
    price: 32.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'В наличии',
  },
  {
    id: 2,
    name: 'Рубашка',
    color: 'Черная',
    size: 'L',
    price: 32.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'В наличии',
  },
];

const orderHistory = [
  {
    id: 3,
    name: 'Кепка',
    color: 'Белая',
    size: 'XL',
    price: 35.0,
    image: 'https://sun9-34.userapi.com/impg/DTM9lA6GxWbcXKbVMXGAIN1wkTXQTbTD4jGZ7A/lPi5nTyhHbs.jpg?size=852x1280&quality=96&sign=12b46bd92dfdac51b2b3d1b3609abe16&type=album',
    quantity: 1,
    stockStatus: 'Доставлено',
  },
];

const UserProfilePage: React.FC = () => {
  const [favorites, setFavorites] = useState(favoriteItems);
  const [orders, setOrders] = useState(orderHistory);
  const [profile, setProfile] = useState<profile | null>(null)
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth/login');
  }, [isAuthenticated, navigate])

  const handleEditProfile = () => {
    // Логика для изменения данных профиля
    console.log('Изменить данные');
  };

  return (
    <div className="container mx-auto p-6">
      {/* Личная информация */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Личный кабинет</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Имя: </span>
            {userInfo.name}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {userInfo.email}
          </p>
          <div className='flex'>
            <button
              onClick={handleEditProfile}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
            >
              Изменить данные
            </button>
            <button
              onClick={() => logout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>

      </div>

      {/* Избранные товары */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Избранное</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">Пусто</p>
        ) : (
          <div className="flex overflow-x-auto space-x-4">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="w-60 flex-shrink-0 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 rounded-lg object-cover mb-2"
                />
                <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.color} {item.size && `/ ${item.size}`}
                </p>
                <p className="text-sm font-semibold text-primary-700">{item.price} ₽</p>
                <button
                  onClick={() =>
                    setFavorites(favorites.filter((favorite) => favorite.id !== item.id))
                  }
                  className="text-sm text-red-500 hover:text-red-700 mt-2"
                >
                  Удалить из избранного
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* История покупок */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">История покупок</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">Пусто</p>
        ) : (
          <div className="space-y-4">
            {orders.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.color} {item.size && `/ ${item.size}`}
                    </p>
                    <p className="text-sm font-semibold text-primary-700">{item.price} ₽</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{item.stockStatus}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
