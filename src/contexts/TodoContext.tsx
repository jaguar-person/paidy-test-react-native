import * as SecureStore from 'expo-secure-store';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { TodoAction, TodoActionTypes, TodoState } from '../models';
import { todoReducer } from '../reducers/todoReducer';

const SECURE_STORAGE_KEY = 'secured_todo_list';
const initialState: TodoState = {};

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // load todos from secure storage on first render
  useEffect(() => {
    SecureStore.getItemAsync(SECURE_STORAGE_KEY).then((todos) => {
      if (todos) {
        dispatch({
          type: TodoActionTypes.INITIAL_TODO,
          payload: JSON.parse(todos)
        });
      }
    });
  }, []);

  // save todos to secure storage on every state change
  useEffect(() => {
    SecureStore.setItemAsync(SECURE_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
