import { useContext } from "react"
import { counterContextObj } from "../contexts/ContextProvider"
import Test from "./test"
import { useCounterStore } from "../store/CreateStore";

function Home() {
  //call useCounterStore hook to get state of zustand store
  let newCounter = useCounterStore((state)=>state.newCounter);
  let incrementCounter = useCounterStore((state)=>state.incrementCounter);

   const {counter,changeCounter} = useContext(counterContextObj);
    console.log("Home"); 
  return (
    <div>
      <h1 className="text-4xl">Counter:{counter}</h1>
      <button onClick={changeCounter} className="bg-amber-300 p-5">Change</button>
    </div>
  )
};
export default Home
