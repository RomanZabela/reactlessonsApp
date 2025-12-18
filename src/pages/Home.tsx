import { useState } from "react";
import { useToastStore } from "../shared/stores/useToastStore";

export const Home = () => {
    const [count, setCount] = useState(0);
    const { addToast } = useToastStore();

    const handleClick = () => {
        setCount(count + 1)
        addToast(`Button clicked! Current count is ${count}`, 'success', 2000);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
}