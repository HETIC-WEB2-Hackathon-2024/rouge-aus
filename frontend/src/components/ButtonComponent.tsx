import {ButtonComponentProps} from "../types.ts";


export default function ButtonComponent({ text, className }: ButtonComponentProps){
    return (
        <div className="btn-container">
            <button className={className}>
                <span>{text}</span>
            </button>
        </div>
    )
}