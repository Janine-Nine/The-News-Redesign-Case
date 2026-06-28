import "./SectionTitle.css";

function SectionTitle({
    title,
    subtitle,
    action
}) {
    return (
        <div className="section-title">
            <div>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {action && (
                <button>
                    {action}
                </button>
            )}
        </div>
    );
}

export default SectionTitle;