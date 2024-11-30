import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { ProductCardProps } from "../types"


export default function HomePage() {
    const [data, setData] = useState<ProductCardProps["product"][]>([])
    useEffect(() => {
        fetch('http://172.20.10.3:8008/v1/items/getshop')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Ошибка при загрузке данных:', error))
        setData(data)
    }, [])

    return (
        <div className="wrapper pl-5 pr-5">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {data.map(product => (
                    <ProductCard key={product.articul} product={product} />
                ))}
            </div>
        </div>
    )
}