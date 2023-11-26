// 2. Переделать приложение, заменив JSON Placeholder на JSON Server:
// начальный список дел отсутствует (пустой массив);
// реализовать CRUD-операции, добавить возможность добавления, изменения и удаления дела;
// реализовать поиск дел по заданной фразе (для нахождения элемента в тексте дела должен
// быть совпадающий с введенной фразой фрагмент);
// реализовать кнопку для включения режима сортировки дел по алфавиту, если кнопка не нажата
// - изначальная сортировка (т.е. отсутствие сортировки).
// Дополнительно: реализовать продвинутый поиск с помощью debounce().

import { useState, useEffect } from "react";
import styles from "../toDoList.module.css";
import { Todo } from "../todo/todo";
import { ControlPanel } from "../controlPanel/controlPanel";
import { createTodo, readTodos, updateTodo, deleteTodo } from "../../api"; // CRUD для сервера
import {
    addTodoInTodos,
    setTodoInTodos,
    removeTodoInTodos,
    findTodo,
} from "../../utils"; // CRUD для стейта состояния
import { NEW_TODO_ID } from "../../constants";

// Старт json-server --watch src/db.json --port 3003

export const ToDoListJsonServer = () => {
    const [todos, setTodos] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState(""); // состояние для поиска
    const [isAlphabetSorting, setIsAlphabetSorting] = useState(false); // флаг для сортировки

    // Создание нового дела или сохранение дела после редактирования
    const onTodoAdd = () => {
        setTodos(addTodoInTodos(todos));
    };

    const onTodoSave = (todoId) => {
        const { title, completed } = findTodo(todos, todoId) || {};

        if (todoId === NEW_TODO_ID) {
            createTodo({ title, completed }).then((todo) => {
                let updatedTodos = setTodoInTodos(todos, {
                    id: NEW_TODO_ID,
                    isEditing: false,
                });
                updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
                updatedTodos = addTodoInTodos(updatedTodos, todo);
                setTodos(updatedTodos);
            });
        } else {
            updateTodo({ id: todoId, title }).then(() => {
                setTodos(
                    setTodoInTodos(todos, { id: todoId, isEditing: false }),
                );
            });
        }
    };
    // После успешного ответа сервера:
    // - если на создание в базе данных, то создаем новое todo в начале массива
    // todos;
    // если на обновление в базе данных, то меняем title для нужного id и
    // полученными данными обновляем стейт состояния.

    // Редактирование дела
    const onTodoEdit = (id) => {
        setTodos(setTodoInTodos(todos, { id, isEditing: true }));
    };

    const onTodoTitleChange = (id, newTitle) => {
        setTodos(setTodoInTodos(todos, { id, title: newTitle }));
    };

    // Смена статуса у законченного дела
    const onTodoCompletedChange = (id, newCompleted) => {
        updateTodo({ id, completed: newCompleted }).then(() => {
            setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
        });
    };

    // Удаление дела
    const onTodoRemove = (id) => {
        deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)));
    };
    // После успешного ответа сервера на удаление в базе данных удаляем todo
    // по нужного id и полученными данными обновляем стейт состояния.

    // Получение todos
    useEffect(() => {
        readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
            setTodos(loadedTodos),
        );
    }, [searchPhrase, isAlphabetSorting]);
    // При изменении в массиве зависимостей будет срабатывать хук useEffect() и
    // будут заново считываться и выводится данные с сервера

    return (
        <>
            <h2>Список дел</h2>
            <div className={styles.app}>
                <ControlPanel
                    onTodoAdd={onTodoAdd}
                    onSearch={setSearchPhrase}
                    onSorting={setIsAlphabetSorting}
                />
                {todos.map(({ id, title, completed, isEditing = false }) => (
                    <Todo
                        key={id}
                        id={id}
                        title={title}
                        completed={completed}
                        isEditing={isEditing} // флаг для редактирования
                        onEdit={() => onTodoEdit(id)}
                        onTitleChange={(newTitle) =>
                            onTodoTitleChange(id, newTitle)
                        }
                        onCompletedChange={(newCompleted) =>
                            onTodoCompletedChange(id, newCompleted)
                        }
                        onSave={() => onTodoSave(id)}
                        onRemove={() => onTodoRemove(id)}
                    />
                ))}
            </div>
        </>
    );
};
