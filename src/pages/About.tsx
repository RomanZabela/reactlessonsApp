import { useState } from "react";

export const About = () => {
    const [title, setTitle] = useState('About Page');
    return (
        <div>
            <h1>{title}</h1>
            <p>This is the about page of our application.</p>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <button onClick={() => setTitle('About Page Updated')}>Update Title</button>
        </div>
    )
}