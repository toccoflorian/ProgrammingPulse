import PropTypes from 'prop-types';
import styles from "./Buttons.module.scss";

export function ButtonPrimary(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button onMouseEnter={props.onMouseEnter} onClick={props.onClick} className={`${styles.SubmitButton}`}>{props.textContent}</button>
        </div>
    </>)
}

export function ButtonYesPrimary(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button onClick={props.onClick} className={`${styles.ButtonYesPrimary}`}>{props.textContent}</button>
        </div>
    </>)
}

export function ButtonNoPrimary(props) {
    return (<>
        <div className={`${styles.buttonContainer} d-flex justify-center align-center`}>
            <button onClick={props.onClick} className={`${styles.ButtonNoPrimary}`}>{props.textContent}</button>
        </div>
    </>)
}



// prop-types
ButtonPrimary.propTypes = {
    textContent: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
}
ButtonYesPrimary.propTypes = {
    textContent: PropTypes.string,
    onClick: PropTypes.func,
}
ButtonNoPrimary.propTypes = {
    textContent: PropTypes.string,
    onClick: PropTypes.func,
}
