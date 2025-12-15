import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    )
}