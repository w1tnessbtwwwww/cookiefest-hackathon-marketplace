import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AuthPage: React.FC = () => {
  return (
    <div className="bg-primary-500 fixed inset-0 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Добро пожаловать!</h1>
        <div className="flex justify-center gap-4 mb-6">
          <NavLink
            to="login"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`
            }
          >
            Вход
          </NavLink>
          <NavLink
            to="register"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`
            }
          >
            Регистрация
          </NavLink>
        </div>
        {/* Точка встраивания для вложенных компонентов */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
