import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import baseUrl from "../../baseurl";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl()}/v1/auth/authorize`,
        { email, password },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data?.detail) {
        // Сервер вернул ошибку с кодом 400
        setError(response.data.detail || "Invalid email or password");
      } else if (response.data?.access_token) {
        const token = response.data.access_token;
        
        // Сохраняем токен в cookies
        document.cookie = `jwt_token=${token}; path=/; SameSite=Lax; Secure`;
        console.log(token)
        // Вызываем функцию логина и перенаправляем
        login();
        navigate('/');
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4">Вход</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
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
      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
      >
        Войти
      </button>
    </form>
  );
};

export default Login;
