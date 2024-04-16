import React, { useState } from "react";

function Pra(){


const [name,setName]=useState("")

const handleChange=(e)=>{
setName(e.target.value)
}
console.log(name)


    return(

    <>
  <label>name </label>
  <input onChange={handleChange}></input>
  <select onChange={handleChange}>
    <option>harsh</option>
    <option>yash</option>
  </select>
    </>
)
}
export default Pra

