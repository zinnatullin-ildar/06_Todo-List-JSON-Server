import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../../../toDoList.module.css";
import { debounce } from "./utils";

export const Search = ({ onSearch }) => {
    const [value, setValue] = useState(""); // состояние для пропа value тега input

    const debounсedOnSearch = useRef(debounce(onSearch, 1500)).current;
    // Использование хука useRef() для предотвращения перерендеривания функции debounсedOnSearch()

    // Реализация поиска с помощью debounce() с задержкой и без нажатия на кнопку
    const onChange = ({ target }) => {
        setValue(target.value);
        debounсedOnSearch(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        onSearch(value);
    }; // поиск активируется по нажатию Enter

    return (
        <form
            className={styles.search}
            onSubmit={onSubmit}
        >
            <input
                className={styles.inputField}
                type="text"
                placeholder="Поиск..."
                value={value}
                onChange={onChange}
            />
            {/* <button
                className={styles.btn}
                type="submit"
            >
                Search
            </button> */}
        </form>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func,
};
