import styles from "./StarsEvaluation.module.scss";
import PropTypes from "prop-types"

export default function StarsEvaluation(props) {

    let imagesPaths = [];
    [...Array(5)].map((_, i) => {
        i < props.note ?
            imagesPaths.push("/transparent-yellow-star.png")
            :
            imagesPaths.push("/transparent-gray-star.png")
    })

    return (<>
        <div className={`${styles.starsContainer} d-flex`}>
            {imagesPaths.map((imagePath, i) => <img key={i} src={`/images${imagePath}`} alt="Evaluation star" />)}
        </div>
    </>)
}

StarsEvaluation.propTypes = {
    note: PropTypes.number,
}