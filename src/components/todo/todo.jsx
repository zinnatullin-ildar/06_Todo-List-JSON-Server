import PropTypes from "prop-types";
import styles from "../toDoList.module.css";

export const Todo = ({
    title,
    completed,
    isEditing,
    onEdit,
    onTitleChange,
    onCompletedChange,
    onSave,
    onRemove,
}) => {
    return (
        <div className={styles.todo}>
            {/* пометка о выполненном деле */}
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={completed}
                onChange={({ target }) => onCompletedChange(target.checked)}
            />
            <div className={styles.title}>
                {/* редактирование по клику на поле*/}
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => onTitleChange(target.value)}
                    />
                ) : (
                    <div onClick={onEdit}>{title}</div>
                )}
            </div>
            {/* сохранение или удаление */}
            <div>
                {isEditing ? (
                    <button
                        className={styles.btn}
                        onClick={onSave}
                    >
                        ✔
                    </button>
                ) : (
                    <button
                        className={styles.btn}
                        onClick={onRemove}
                    >
                        ✖
                    </button>
                )}
            </div>
        </div>
    );
};

Todo.propTypes = {
    title: PropTypes.string,
    completed: PropTypes.bool,
    isEditing: PropTypes.bool,
    onTitleChange: PropTypes.func,
    onCompletedChange: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onRemove: PropTypes.func,
};
