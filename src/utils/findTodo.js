export const findTodo = (todos, todoId) =>
    todos.find(({ id }) => id === todoId);

// С помощью метода find() возвращаем значение первого найденного todo в массиве
// todos, который удовлетворяет условию по id.
