export default function ButtonComponent({ text, className }){
    return (
        <div className="btn-container">
            <button className={className}>
                <span>{text}</span>
            </button>
        </div>
    )
}