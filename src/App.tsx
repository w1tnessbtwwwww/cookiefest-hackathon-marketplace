import Header from "./components/header/Header";
import ProductPage from "./components/ProductPage";

function App() {
  const product = {
    imageUrl:
      "https://basket-12.wbbasket.ru/vol1657/part165757/165757788/images/c516x688/1.webp",
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    title: "Футболка Ticle",
    price: "1620",
    oldPrice: "4960",
    discount: "-67%",
    rating: 4.8,
    numReviews: 31601,
    description: "Эта футболка изготовлена из премиального материала и идеально подходит для повседневного ношения.",
    colors: [
      { name: "Бежевый", hex: "#F5F5DC" },
      { name: "Серый", hex: "#808080" },
      { name: "Черный", hex: "#000000" },
    ],
  };

  return (
    <div className="wrapper min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ProductPage
        imageUrl={product.imageUrl}
        images={product.images}
        title={product.title}
        price={product.price}
        oldPrice={product.oldPrice}
        discount={product.discount}
        rating={product.rating}
        numReviews={product.numReviews}
        description={product.description}
        colors={product.colors}
      />
    </div>
  );
}

export default App;
