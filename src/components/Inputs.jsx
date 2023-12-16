
import { PropTypes } from "prop-types";
import styles from "./Inputs.module.scss";

export function InputTextPrimary(props) {

    return (<>

        <div className={`${styles.inputContainer} d-flex justify-center align-center`}>

            <input
                type={props.type}
                name={props.name}
                id={props.id}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className={`
                    ${styles.InputTextPrimary} 
                    d-flex 
                    justify-center 
                    align-center`}
            />

        </div>
    </>)
}

InputTextPrimary.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
}
