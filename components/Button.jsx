import "./Button.css";

function Button({
    children,
    text,
    onClick = () => {},
    type = "button",
    variant = "primary"
}) {
    return (
        <button
            className={`btn btn-${variant}`}
            onClick={onClick}
            type={type}
        >
            {text || children}
        </button>
    );
}

export default Button;