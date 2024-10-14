const getInitialState = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const savedDoneTodos = JSON.parse(localStorage.getItem("doneTodos")) || [];
  return {
    todos: savedTodos,
    doneTodos: savedDoneTodos,
  };
};

const defaultState = getInitialState();

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_TODOS":
      localStorage.setItem("todos", JSON.stringify(action.payload));
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD":
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        status: "incomplete",
      };
      const updatedTodosAdd = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodosAdd));
      return {
        ...state,
        todos: updatedTodosAdd,
      };

    case "DONE":
      const completedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      alert("Задание помечено как выполнено");

      const newTodosAfterDone = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      const updatedDoneTodosDone = [
        ...state.doneTodos,
        { ...completedTodo, status: "completed" },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodosAfterDone));
      localStorage.setItem("doneTodos", JSON.stringify(updatedDoneTodosDone));
      return {
        ...state,
        todos: newTodosAfterDone,
        doneTodos: updatedDoneTodosDone,
      };

    case "REMOVE":
      alert("Задание Удалено");
      const newTodosAfterRemove = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      const newDoneTodosAfterRemove = state.doneTodos.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(newTodosAfterRemove));
      localStorage.setItem(
        "doneTodos",
        JSON.stringify(newDoneTodosAfterRemove)
      );
      return {
        ...state,
        todos: newTodosAfterRemove,
        doneTodos: newDoneTodosAfterRemove,
      };

    case "UPDATE":
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              title: prompt("Введите новое название задачи:", todo.title),
            }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };

    case "UNDO_DONE":
      const undoneTodo = state.doneTodos.find(
        (todo) => todo.id === action.payload
      );
      alert("Задание возвращено в список задач");

      const newDoneTodosAfterUndo = state.doneTodos.filter(
        (todo) => todo.id !== action.payload
      );
      const updatedTodosAfterUndo = [
        ...state.todos,
        { ...undoneTodo, status: "In Progress" },
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodosAfterUndo));
      localStorage.setItem("doneTodos", JSON.stringify(newDoneTodosAfterUndo));
      return {
        ...state,
        doneTodos: newDoneTodosAfterUndo,
        todos: updatedTodosAfterUndo,
      };

    default:
      return state;
  }
};
