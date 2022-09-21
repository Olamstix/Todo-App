import React, { useCallback, useState } from "react";
import { InputComponent } from "./Input";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillDelete,
  AiFillEdit,
  AiOutlineSave,
  AiFillSave,
  AiOutlineCloseSquare,
  AiFillCloseSquare,
} from "react-icons/ai";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [valueAdd, setValueAdd] = useState("");
  const [edit, setEdit] = useState("");
  const [editValue, setEditValue] = useState("");

  const addTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (valueAdd === "") {
        return;
      }

      const newValue = valueAdd.replace(/( )+/g, " ");
      if (newValue === " ") {
        return;
      }

      if (todos.find((todo) => todo.value === newValue)) {
        return;
      }

      setValueAdd("");
      setTodos([
        { value: newValue, key: todos.length + 1 + "", isComplete: false },
        ...todos,
      ]);
    },
    [todos, valueAdd]
  );

  const updateTodo = useCallback(() => {
    if (editValue === "") {
      return;
    }

    const newValue = editValue.replace(/( )+/g, " ");
    if (newValue === " ") {
      return;
    }

    if (todos.find((todo) => todo.value === newValue)) {
      return;
    }

    const nextState = todos.map((todo) => {
      if (todo.key === edit) {
        todo.value = newValue;
      }
      return todo;
    });
    setEdit("");
    setEditValue("");
    setTodos(nextState);
  }, [edit, editValue, todos]);

  const checkTodo = useCallback(
    (key) => {
      const nextState = todos.map((todo) => {
        if (todo.key === key) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      setTodos(nextState);
    },
    [todos]
  );

  return (
    <div id="container">
      <div id="container__header">
        <h1 id="container__header__title"> What 's the Plan for Today</h1>
      </div>
      <form onSubmit={addTodo}>
        <div id="container__add">
          <InputComponent
            props={{
              name: "add-todo",
              handleChange: setValueAdd,
              value: valueAdd,
              placeholder: "Add a todo",
            }}
          />
          <button type="submit" className="todo__button add">
            add new
          </button>
        </div>
      </form>
      <div id="container__content">
        <ul>
          {todos?.map((todo) => (
            <li
              className={todo.isComplete ? "todo__item complete" : "todo__item"}
              key={todo.key}
            >
              <div
                onClick={
                  edit !== todo.key ? () => checkTodo(todo.key) : undefined
                }
                className={`todo__item__value`}
                key={todo.id}
              >
                {edit !== todo.key ? (
                  <span>{todo.value}</span>
                ) : (
                  <input
                    autoFocus={true}
                    className="item__input__edit"
                    value={editValue}
                    onKeyDown={(e) => e.key === "Enter" && updateTodo()}
                    onChange={(e) => {
                      setEditValue(e.target.value);
                    }}
                    type="text"
                  />
                )}
              </div>
              <div className="todo__item__actions">
                {edit !== todo.key && (
                  <>
                    <button
                      onClick={() =>
                        setTodos(todos.filter((e) => e.key !== todo.key))
                      }
                    >
                      <AiOutlineDelete size={30} className="action-1" />
                      <AiFillDelete size={30} className="action-2" />
                    </button>
                    <button
                      onClick={() => {
                        setEdit(todo.key);
                        setEditValue(todo.value);
                      }}
                    >
                      <AiOutlineEdit size={30} className="action-1" />
                      <AiFillEdit size={30} className="action-2" />
                    </button>
                  </>
                )}
                {edit === todo.key && (
                  <>
                    <button onClick={updateTodo}>
                      <AiOutlineSave size={30} className="action-1" />
                      <AiFillSave size={30} className="action-2" />
                    </button>
                    <button
                      onClick={() => {
                        setEdit(todo.key);
                        setEditValue(todo.value);
                      }}
                    >
                      <AiOutlineCloseSquare size={30} className="action-1" />
                      <AiFillCloseSquare size={30} className="action-2" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
