import "./ProgressBar.css";

function ProgressBar({

    value = 0

}) {

    return (

        <div className="progress-container">

            <div
                className="progress-fill"
                style={{
                    width: `${value}%`
                }}
            />

        </div>

    );

}

export default ProgressBar;