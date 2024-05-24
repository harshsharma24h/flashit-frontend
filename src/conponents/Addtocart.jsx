import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData, addFilteredData } from '../reducers/filteredDataReducer'

function Addtocart() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const filterdata = useSelector(state => state.filteredData.filteredData);

    async function api() {
        const response = await fetch('https://flashit-harsh-sharma.onrender.com/get-ads');
        let a = await response.json();
        setData(a);
    }

    useEffect(() => {
        api();
    }, []);

    const getIt = (i) => {
        let a = data.filter((e, index) => (
            index === i
        ));
        dispatch(addFilteredData(a[0]));
    }




    const filteredData = useSelector((state) => state.filteredData.value);


    console.log(filteredData,'cominf form redux')

    return (
        <div>
            {data.map((e, i) => (
                <p key={i} onClick={() => getIt(i)}>{e.title}</p>
            ))}
            <div>
                <h3>Filtered Data:</h3>
                {filterdata.map((e, i) => (
                    <p key={i}>{e.title}</p>
                ))}
            </div>
        </div>
    );
}

export default Addtocart;
