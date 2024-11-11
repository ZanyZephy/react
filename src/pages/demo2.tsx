import { useReducer, useRef, useState, forwardRef } from "react";

function countReducer(state: number, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const MYButton = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

function App() {
  const [count, dispatch] = useReducer(countReducer, 0);
  const buttonRef = useRef();
  console.log(buttonRef, "buttonRef");
  return (
    <>
      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          这是第一行。
          <br />
          这是第二行。
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          减{count}
        </button>

        <MYButton ref={buttonRef}></MYButton>
      </div>
    </>
  );
}

export default App;
