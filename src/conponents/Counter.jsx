import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../reducers/counterReducer'; // Import your actions
import { YesTrue, NoFalse } from '../reducers/singinSingupReducer'; // Import your actions
import { login } from '../reducers/createadreducer';




const Counter = () => {
  const counter = useSelector((state) => state.counter.value);
  const YNvalue = useSelector((state) => state.YNvalue.value); // Corrected to access YesNo slice

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <h1>Counter: {YNvalue}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(YesTrue())}>true</button>
      <button onClick={() => dispatch(NoFalse())}>false</button>
      <button onClick={() =>  dispatch(login())}>false</button>
    </div>
  );
};

export default Counter;
