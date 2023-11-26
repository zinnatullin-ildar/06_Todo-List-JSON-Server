export const setTodoInTodos = (todos, newTodoData) =>
    todos.map((todo) =>
        todo.id === newTodoData.id
            ? {
                  ...todo,
                  ...newTodoData,
              }
            : todo,
    );
// С помощью метода map() возвращаем новый массив из todos, в котором все todo
// будут без изменений, кроме того, который хотим обновить.
// По id находим изменяемый todo и возвращаем его обновленные данные.
// Если же это не он, то возвращается "старый" todo.
