import PropTypes from "prop-types";
import styles from "../toDoList.module.css";
import { Search, Sorting } from "./components";

export const ControlPanel = ({ onTodoAdd, onSearch, onSorting }) => {
    return (
        <div className={styles.controlPanel}>
            <Search onSearch={onSearch} />
            <Sorting onSorting={onSorting} />
            <button
                className={styles.btn}
                onClick={onTodoAdd}
            >
                ✚
            </button>
        </div>
    );
};

ControlPanel.propTypes = {
    onTodoAdd: PropTypes.func,
    onSearch: PropTypes.func,
    onSorting: PropTypes.func,
};
