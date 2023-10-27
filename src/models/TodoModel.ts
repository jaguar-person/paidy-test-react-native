export type Id = string;
export type TodoState = Record<Id, ITodoItem>;

export enum TodoActionTypes {
  INITIAL_TODO = 'INITIAL_TODO',
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO'
}

export type TodoAction =
  | { type: TodoActionTypes.INITIAL_TODO; payload: TodoState }
  | { type: TodoActionTypes.ADD_TODO; payload: ITodoItem }
  | { type: TodoActionTypes.UPDATE_TODO; payload: ITodoItem }
  | { type: TodoActionTypes.REMOVE_TODO; payload: Id };

export interface ITodoItem {
  id: Id;
  label: string;
  isCompleted: boolean;
}
