import Header from "./components/header/Header";
import ProductCard from './components/ProductCard';

function App() {
  const product = {
    imageUrl: 'https://basket-12.wbbasket.ru/vol1657/part165757/165757788/images/c516x688/1.webp',
    title: 'Футболка Ticle',
    price: '1620',
    oldPrice: '4960', // Старая цена
    discount: '-67%', // Скидка
    rating: 4.8, // Рейтинг
    numReviews: 31601 // Количество отзывов
  };

  return (
    <div className="wrapper min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex justify-center items-center py-10">
        <ProductCard
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          oldPrice={product.oldPrice} // Передаём старую цену
          discount={product.discount} // Передаём скидку
          rating={product.rating}
          numReviews={product.numReviews}
        />
      </div>
    </div>
  );
}

export default App;
