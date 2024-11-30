import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.20.10.3:8008/v1/auth/register",
        { email, password },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.detail) {
        // Обработка ошибок сервера
        setError(response.data.detail || "Ошибка регистрации");
      } else if (response.data?.access_token) {
        const token = response.data.access_token;

        // Сохранение токена в cookies
        document.cookie = `jwt_token=${token}; path=/; SameSite=Lax; Secure`;

        // Логин и навигация
        login();
        navigate("/");
      }
    } catch (err) {
      setError("Что-то пошло не так. Попробуйте еще раз.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Регистрация</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Подтвердите пароль
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Register;
