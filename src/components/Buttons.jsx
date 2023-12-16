import PropTypes from 'prop-types';
import styles from "./Buttons.module.scss";

export function ButtonYesPrimary(props) {

    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.ButtonYesPrimary}`}>{props.buttonTextContent}</button>
        </div>
    </>)
}

export function ButtonYesSecondary(props) {

    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.ButtonYesSecondary}`}>{props.buttonTextContent}</button>
        </div>
    </>)
}

export function ButtonNoPrimary(props) {

    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.ButtonNoPrimary}`}>{props.buttonTextContent}</button>
        </div>
    </>)
}

// prop-types
ButtonYesPrimary.propTypes = {
    buttonTextContent: PropTypes.string,
}
ButtonNoPrimary.propTypes = {
    buttonTextContent: PropTypes.string,
}