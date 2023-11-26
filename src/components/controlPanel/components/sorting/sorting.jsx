import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../../toDoList.module.css";

export const Sorting = ({ onSorting }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    // флаг для сортировки, дублирует состояние из родительского компонента,
    // потом пофиксим с помощью React Context или Redux

    const onChange = ({ target }) => {
        setIsEnabled(target.checked);
        onSorting(target.checked);
    }; // для синхронной работы состояния сортировки

    return (
        <button className={styles.btn}>
            <input
                className={styles.checkboxSort}
                id="sortingButton"
                type="checkbox"
                checked={isEnabled}
                onChange={onChange}
            />
            <label
                className={styles.label}
                htmlFor="sortingButton"
            >
                A&darr;
            </label>
        </button>
    );
};

Sorting.propTypes = {
    onSorting: PropTypes.func,
};
