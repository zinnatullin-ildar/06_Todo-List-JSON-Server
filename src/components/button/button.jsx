import PropTypes from "prop-types";
import styles from "../toDoList.module.css";

export const Button = ({ children, onClick }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
};
