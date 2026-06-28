import "./Card.css";

function Card({
    title,
    description,
    children
}) {
    return (
        <div className="card-custom">
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
            {children}
        </div>
    );
}

export default Card;