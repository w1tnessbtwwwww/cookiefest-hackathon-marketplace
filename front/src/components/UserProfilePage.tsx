import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import baseUrl from '../baseurl';
import { productNewType } from '../types';

interface Profile {
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  phoneNumber: string;
}



const UserProfilePage: React.FC = () => {
  const [favorites, setFavorites] = useState<productNewType | []>([]);
  const [orders, setOrders] = useState<productNewType | []>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth/login');

    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
      return null;
    };

    const jwtToken = getCookie('jwt_token');
    if (jwtToken) {
      try {
        const decodedToken: { [key: string]: any } = jwtDecode(jwtToken);
        setUserId(decodedToken.id);
        if (decodedToken.profile) {
          const { surname, name, patronymic, email, phoneNumber } = decodedToken.profile;
          setProfile({ surname, name, patronymic, email, phoneNumber });
        }
        else setProfile({ surname: "test", name: "test", patronymic: "test", email: "test@test", phoneNumber: "test" })
      } catch (error) {
        console.error('Failed to decode JWT token:', error);
      }
    }

    const fetchFavorites = async () => {
      try {
        const fav = await axios.get(`${baseUrl()}/v1/favorite/userfavourites?user_id=${userId}`)
        setFavorites(fav.data)
      } catch (err) {
        console.log('fetchFavorites error')
      }
    }
    fetchFavorites()

    const fetchOrders = async () => {
      try {
        const ord = await axios.get(`${baseUrl()}/v1/orders/getorders?user=${userId}`)
        setOrders(ord.data)
      } catch (err) {
        console.log('fetchOrders error')
      }
    }
    fetchOrders()
  }, [isAuthenticated, navigate]);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleSaveProfile = () => {
    // Логика для сохранения измененных данных профиля
    console.log('Сохранить данные:', profile);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Личная информация */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Личный кабинет</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Имя: </span>
            {profile.surname} {profile.name} {profile.patronymic}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {profile.email}
          </p>
          <p>
            <span className="font-semibold">Телефон: </span>
            {profile.phoneNumber}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleEditProfile}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
            >
              Изменить данные
            </button>
            <button
              onClick={() => { logout() }}
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

      {/* Модальное окно для изменения данных профиля */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Изменить данные профиля</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Фамилия:</label>
                <input
                  type="text"
                  value={profile.surname}
                  onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Имя:</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Отчество:</label>
                <input
                  type="text"
                  value={profile.patronymic}
                  onChange={(e) => setProfile({ ...profile, patronymic: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Телефон:</label>
                <input
                  type="text"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
