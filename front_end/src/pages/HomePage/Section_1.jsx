import styles from "./Section_1.module.scss"
import PropTypes from 'prop-types';


export function Section_1_type_1(props) {

    return (<>
        <div className={`${styles.sections} d-flex`}>
            <div className={``}>
                <h3>{props.titre}</h3>
                <p>{props.contenu}</p>
            </div>

            <img className={``} src={props.imagePath} alt="Image décorative" />
        </div>
    </>)
}

export function Section_1_type_2(props) {

    return (<>
        <div className={`${styles.sections} d-flex`}>
            <img src={props.imagePath} alt="Image décorative" />

            <div>
                <h3>{props.titre}</h3>
                <p>{props.contenu}</p>
            </div>
        </div>
    </>)
}


// prop-types
Section_1_type_1.propTypes = {
    titre: PropTypes.string,
    contenu: PropTypes.string,
    imagePath: PropTypes.string,
}
Section_1_type_2.propTypes = {
    titre: PropTypes.string,
    contenu: PropTypes.string,
    imagePath: PropTypes.string,
}