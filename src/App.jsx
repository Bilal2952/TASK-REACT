import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = e => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const removeTodo = id => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <div>
      <h1>TODO-APP</h1>

      <form onSubmit={addTodo}>
        <StyleInput
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <StyleButton type="submit">Add Todo</StyleButton>
      </form>
      <ul>
        {todos.map(todo => (
          <StyleTask
            key={todo.id}
          >
            {todo.text}
            <StyleRemoveButton onClick={() => removeTodo(todo.id)}>Remove</StyleRemoveButton>
          </StyleTask>
        ))}
      </ul>
    </div>
  );
};

export default App;
const StyleInput = styled.input`
  margin: 20px;
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
`;
const StyleButton = styled.button`
    padding: 10px 15px;
  font-size: 16px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
`;
const StyleTask = styled.li`
    list-style: none;
    background-color: white;
    width: 400px;
    padding: 15px;
    margin-bottom: 10px;
    margin-left: 22px ;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;
const StyleRemoveButton = styled.button`
  background-color: red;
  color: aliceblue;
  border: none;
`;


