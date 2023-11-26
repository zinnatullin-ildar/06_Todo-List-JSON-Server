import { HTTP_METHOD } from "../constants";

// Шаблон запросов на сервер
const fetchServer = (method, { id, ...payload } = {}) => {
    let url = `http://localhost:3003/todos`;
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
    };

    if (method === HTTP_METHOD.GET) {
        const { searchPhrase, isAlphabetSorting } = payload;
        const sortingParams = isAlphabetSorting
            ? "_sort=id&_order=asc"
            : "_sort=id&_order=desc";
        url += `?${sortingParams}&title_like=${searchPhrase}`;
    } else {
        if (method !== HTTP_METHOD.POST) {
            url += `/${id}`;
        }

        if (method !== HTTP_METHOD.DELETE) {
            options.body = JSON.stringify(payload);
        }
    }
    // Для метода "GET" добавление возможности сортировки todo на сервере в базе данных по title и id.
    // Проверка на наличие в запросе id: оно добавляется в конец адреса при методах кроме "GET" и "POST".
    // Проверка на наличие в запросе body: его не нужно для методов "GET" и "DELETE".

    return fetch(url, options).then((jsonData) => jsonData.json());
};
// В данной функции в принимаемых параметрах деструктуризием второй аргумент
// и задаем его значение по умолчанию как пустой объект

// CRUD
export const createTodo = (newTodo) => fetchServer("POST", newTodo); // добавляем todo (метод POST)

export const readTodos = (searchPhrase = "", isAlphabetSorting = false) =>
    fetchServer("GET", { searchPhrase, isAlphabetSorting });
// получаем todos (метод GET, работает по умолчанию), в аргументах находятся значения из массива зависимостей useEffect()

export const updateTodo = (todoData) => fetchServer("PATCH", todoData); // изменяем todo (метод PATCH)

export const deleteTodo = (todoId) => fetchServer("DELETE", { id: todoId }); // удаляем todo (метод DELETE)
