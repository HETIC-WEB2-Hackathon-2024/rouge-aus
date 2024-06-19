export default function TagComponent({active, text}){

    const handleTagClassName = () :string => {
        return active ? 'tag-container' : 'tag-container active'
    }
    return (
        <div className={handleTagClassName()}>
            <p>{text}</p>
        </div>
        )
}