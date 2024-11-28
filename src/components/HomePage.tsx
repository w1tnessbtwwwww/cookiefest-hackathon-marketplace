import { useEffect, useState } from "react"



export default function HomePage(){
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos/1')
              .then(response => response.json())
              .then(data => setData(data))
              .catch(error => console.error('Ошибка при загрузке данных:', error))
          
    }, [])

    return(
        <div>
            
        </div>
    )
}