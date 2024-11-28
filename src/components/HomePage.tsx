import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"


export default function HomePage() {
    // const [data, setData] = useState([{}])
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/photos/')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => console.error('Ошибка при загрузке данных:', error))
    // }, [])

    const product = {
        id: 1,
        imagesByColor: {
            Black: ['https://optim.tildacdn.com/tild3032-3364-4166-b538-646366303863/-/format/webp/2_29.jpg', 'https://optim.tildacdn.com/tild6162-3437-4461-a436-333562616235/-/format/webp/3_33.jpg', 'https://optim.tildacdn.com/tild3433-3061-4332-a239-353861666635/-/format/webp/4_37.jpg'],
            White: ['https://optim.tildacdn.com/tild3439-3137-4263-a266-316232396330/-/format/webp/2_28.jpg', 'https://optim.tildacdn.com/tild6661-6262-4661-a261-666366396662/-/format/webp/4_36.jpg', 'https://optim.tildacdn.com/tild3639-6363-4738-b934-303362396132/-/format/webp/5_27.jpg'],
            Beige: ['https://optim.tildacdn.com/tild3632-3030-4263-b038-336461666339/-/format/webp/2_30.jpg', 'https://optim.tildacdn.com/tild3166-3039-4333-b764-626133643433/-/format/webp/5_29.jpg', 'https://optim.tildacdn.com/tild3662-3761-4563-b434-613363386664/-/format/webp/4_38.jpg'],
        },
        title: "Футболка",
        price: 1620,
        oldPrice: 4960,
        discount: "-67%",
        rating: 4.8,
        numReviews: 31601,
        description: `
          Футболка оверсайз из плотного хлопка.
          Состав и уход:
          - Хлопок 100%
          - Бережная стирка на 30°
          - Отжим и сушка запрещена
          - Не отбеливать

          На моделе размер: L
          Параметры модели: рост: 180 | 108-76-110
        `,
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Beige', hex: '#EED9C4' },
        ],
    };

    return (
        <div className="wrapper">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                <ProductCard product={product} />
                {/* {data.map(product => (
                    <ProductCard key={product.id} product={{
                        id: product.id,
                        imagesByColor: {
                            Black: [product.url]
                        },
                        title: product.title,
                        price: 400,
                        oldPrice: undefined,
                        discount: undefined,
                        rating: 4.5,
                        numReviews: 234,
                        description: product.title,
                        colors: [{name: "Black", hex:'#fffff'}],
                    }} />
                ))} */}
            </div>
        </div>
    )
}