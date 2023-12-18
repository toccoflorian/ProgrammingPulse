import { PropTypes } from "prop-types";
import styles from "./Titres.module.scss";


// H1
export const H1Primary = (props) => <h1 className={`${styles.H1Primary}`}>{props.textContent}</h1>;

// H2
export const H2Primary = (props) => <h2 className={`${styles.H2Primary}`}>{props.textContent}</h2>;

// H3
export const H3Primary = (props) => <h3 className={`${styles.H3Primary}`}>{props.textContent}</h3>;


// props types
H1Primary.propTypes = {
    textContent: PropTypes.string,
}
H2Primary.propTypes = {
    textContent: PropTypes.string,
}
H3Primary.propTypes = {
    textContent: PropTypes.string,
}

