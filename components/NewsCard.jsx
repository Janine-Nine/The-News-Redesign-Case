import "./NewsCard.css";

function NewsCard({
    image,
    title,
    category,
    time,
    author
}) {

    return (

        <article className="news-card">

            <img
                src={image}
                alt={title}
                className="news-image"
            />

            <div className="news-content">

                {category && <span className="news-category">{category}</span>}

                <h3 className="news-title">{title}</h3>

                <div className="news-footer">

                    {author && <span className="news-author">{author}</span>}

                    {time && <span className="news-time">{time}</span>}

                </div>

            </div>

        </article>

    );
}

export default NewsCard;