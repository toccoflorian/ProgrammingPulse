import PropTypes from 'prop-types';
import styles from "./Buttons.module.scss";

export function ButtonYesPrimary(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.ButtonYesPrimary}`}>{props.textContent}</button>
        </div>
    </>)
}

export function ButtonNoPrimary(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.ButtonNoPrimary}`}>{props.textContent}</button>
        </div>
    </>)
}

// bouton de formulaire
export function SubmitButton(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button className={`${styles.SubmitButton}`}>{props.textContent}</button>
        </div>
    </>)
}


// prop-types
ButtonYesPrimary.propTypes = {
    textContent: PropTypes.string,
}
ButtonNoPrimary.propTypes = {
    textContent: PropTypes.string,
}
SubmitButton.propTypes = {
    textContent: PropTypes.string,
}