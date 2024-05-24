import React, { useEffect, useState } from 'react'
import { login } from '../reducers/createadreducer';

const Test2 = () => {
    const [show, setLogin] = useState([]);


    async function api() {
        let data =  await fetch("https://jsonplaceholder.typicode.com/users")
        let set = await data.json()
       
        setLogin(set)
    }

    useEffect(()=>{
        api()
    },[])



console.log(login)


    return (





        <>
        <div>
        {show.map((e) => (
                <h1>{e.address.geo.lat}</h1>
            ))}
        </div>
           

            hii

        </>
    )
}

export default Test2