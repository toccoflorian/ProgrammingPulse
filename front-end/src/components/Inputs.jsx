
import { PropTypes } from "prop-types";
import styles from "./Inputs.module.scss";

export function InputTextPrimary(props) {

    return (<>
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            className={`
                    ${styles.InputTextPrimary} 
                    d-flex 
                    justify-center 
                    align-center`}
        />
    </>)
}

export function TextArea(props) {
    return (<>
        <textarea
            name={props.name}
            id={props.id}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={`${styles.TextArea}`}
        />
    </>)
}


// prop types
InputTextPrimary.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
}
TextArea.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
}
