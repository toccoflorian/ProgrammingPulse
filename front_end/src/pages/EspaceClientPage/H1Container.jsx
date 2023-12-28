import PropTypes from "prop-types";

export default function H1Container(props) {


    return (<>
        {props.currentUser &&
            <h1>{props.currentUser.family_name} {props.currentUser.given_name}</h1>}
    </>)
}

H1Container.propTypes = {
    currentUser: PropTypes.object
}