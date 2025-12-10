import "./errorMessage.css"

export function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="error-box">
        <strong className="error-title">Error:</strong>
        <span>{message}</span>
        </div>
    )
}