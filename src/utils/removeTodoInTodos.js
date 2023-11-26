export const removeTodoInTodos = (todos, todoId) =>
    todos.filter(({ id }) => id !== todoId);

// С помощью метода filter() возвращаем новый массив с отфильтрованным списком,
// в котором находятся todo с id не равном id, переданном в аргументы, т.к. этот
// todo уже удален.
