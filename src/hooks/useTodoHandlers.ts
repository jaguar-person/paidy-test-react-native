import React from 'react';
import { v4 } from 'uuid';
import { TodoState, TodoAction, TodoActionTypes, ITodoItem } from '../models';

export const useTodoHandlers = (
  state: TodoState,
  dispatch: React.Dispatch<TodoAction>
) => {
  const handleAdd = (label: string) => {
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      payload: { id: v4(), label, isCompleted: false }
    });
  };

  const handleToggle = (id: string) => {
    const todo: ITodoItem = {
      ...state[id],
      isCompleted: !state[id].isCompleted
    };

    dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: todo });
  };

  const handleLabelChange = (id: string, label: string) => {
    const todo: ITodoItem = { ...state[id], label };

    dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: todo });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: TodoActionTypes.REMOVE_TODO, payload: id });
  };

  return { handleAdd, handleToggle, handleLabelChange, handleRemove };
};
