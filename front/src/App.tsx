import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import MerchantsPage from "./components/MerchantsPage";
import AuthPage from "./components/auth/AuthPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CartPage from "./components/CartPage";
import SearchPage from "./components/SearchPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <div className="wrapper min-h-screen bg-primary-100 dark:bg-primary-900">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/offers/:id" element={<MerchantsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}





export default App;
