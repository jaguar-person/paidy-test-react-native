import { TodoList } from '../components/TodoList';
import { TodoProvider } from '../contexts/TodoContext';

export const TodoListScreen = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};
