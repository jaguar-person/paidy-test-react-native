import { TodoState } from '../models';

export const todosAsList = (state: TodoState) => {
  return Object.values(state);
};
