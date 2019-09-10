import React, { useState } from 'react';

export function useCounter(isAdvance = false) {
  const [counter, setCounter] = useState(0);
  function increment() {
    setCounter(oldCount => oldCount + (isAdvance ? 3 : 1));
  }
  function decrement() {
    setCounter(oldCount => oldCount - 1);
  }
  return { counter, increment, decrement };
}

const Counter = props => {
  const { isAdvance = false } = props;
  const title = isAdvance ? 'Advance Counter' : 'Simple Counter';
  const { counter, increment , decrement } = useCounter(isAdvance);
  return (
    <div>
      <h1 data-testid="counter-title">Hi! I am {title}</h1>
      <p data-testid="counter-value">{counter}</p>
      <button data-testid="btn-increment" onClick={increment}>Increment</button>
      <button data-testid="btn-decrement" onClick={decrement}>Decrement</button>
      {isAdvance && counter % 10 === 0 && <p data-testid="holy-text">HOLY MOLLY</p>}
    </div>
  );
};

export default Counter;
