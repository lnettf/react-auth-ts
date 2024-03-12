import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { decrement, increment } from "./modules/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const handleSum = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <>
      <button onClick={handleSum}>+</button>
      {count}
      <button onClick={handleDecrement}>-</button>
    </>
  );
}

export default App;
