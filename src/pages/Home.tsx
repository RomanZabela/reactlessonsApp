import { useState } from "react";
import { useToastStore } from "../shared/stores/useToastStore";

export const Home = () => {
    const [count, setCount] = useState(0);
    const { addToast } = useToastStore();

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        addToast(`Count incremented to ${newCount}`, 'success', 2000);
    };

    return (
        <div>
            <h1>Home Page</h1>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    );
}