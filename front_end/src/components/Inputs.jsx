
import PropTypes from "prop-types";
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

export function InputFilePrimary(props) {
    return (<>
        <div className={`${styles.InputFilePrimary} d-flex flex-column`}>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type="file"
                name={props.name}
                id={props.id}
                onClick={props.onClick}
                onChange={props.onChange}
            ></input>
        </div>

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
InputFilePrimary.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
}