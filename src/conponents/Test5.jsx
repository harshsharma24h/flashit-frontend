import React, { useState } from 'react';

function Test5() {
    const [cked, setCked] = useState([]);
    

    const trial = [
        {
            countery: "india",
            code: "IND",
            cite: ["bhopal", "indore"]
        },
        {
            countery: "pakestan",
            code: "PAK",
            cite: ["lahore", "islamabad"]
        },
        {
            countery: "america",
            code: "USA",
            cite: ["aerazona", "landon"]
        },
        {
            countery: "australai",
            code: "AUS",
            cite: ["sydney", "melbourne"]
        }
    ];

    // const handleCheckboxChange = (index) => {
    //     if (checkedIndices.includes(index)) {
    //         setCheckedIndices(checkedIndices.filter(i => i !== index));
    //     } else {
    //         setCheckedIndices((p)=>[...p, index]);
    //     }
    // };

const handelit=(i)=>{
   setCked([i])
}
const [filterdata,setFilterdata]=useState(trial)
const deleteIt=(i)=>{
let a = filterdata.filter((e,index)=>(
i!==index
))
setFilterdata(a)

}

    return (
        <div>
            {/* {trial.map((item, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                    <input 
                        type="checkbox" 
                        checked={checkedIndices.includes(index)} 
                        onChange={() => handleCheckboxChange(index)} 
                    />
                    <h1>{item.countery}</h1>
                    {checkedIndices.includes(index) && (
                        <button style={{ marginLeft: '10px' }}>Button</button>
                    )}
                </div>
            ))} */}



            {filterdata.map((e, index) => (
                <div key={e.index}>
                    <input type='checkbox' checked={cked.includes(index)} onClick={()=>handelit(index)} ></input>
                    <h5>{e.countery}</h5>
                  { cked.includes(index)&& <button onClick={()=>deleteIt(index)}>click me </button>}
                </div>

            ))}


        </div>
    );
}

export default Test5;
