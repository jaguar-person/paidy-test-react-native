import { TodoAction, TodoActionTypes, TodoState } from '../models';

export const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.INITIAL_TODO:
      return action.payload;
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case TodoActionTypes.REMOVE_TODO:
      const { [action.payload]: _, ...rest } = state;

      return rest;
    default:
      return state;
  }
};
