import { TodoAction, TodoActionTypes } from '../models';
import { todoReducer } from './todoReducer';

describe('todoReducer', () => {
  it('should handle the INITIAL action', () => {
    // given
    const initialState = {};
    const expectedState = {
      1: {
        id: '1',
        label: 'test 1',
        isCompleted: true
      },
      2: {
        id: '2',
        label: 'test 2',
        isCompleted: false
      }
    };

    // when
    const action: TodoAction = {
      type: TodoActionTypes.INITIAL_TODO,
      payload: expectedState
    };

    // then
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the ADD action', () => {
    // given
    const initialState = {};
    const newItem = {
      id: '1',
      label: 'test',
      isCompleted: false
    };
    const expectedState = {
      [newItem.id]: newItem
    };

    // when
    const action: TodoAction = {
      type: TodoActionTypes.ADD_TODO,
      payload: newItem
    };

    // then
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the UPDATE action', () => {
    // given
    const updatedId = '1';
    const initialState = {
      [updatedId]: {
        id: updatedId,
        label: 'test',
        isCompleted: false
      }
    };
    const updatedItem = {
      id: updatedId,
      label: 'test',
      isCompleted: true
    };
    const expectedState = {
      [updatedId]: updatedItem
    };

    // when
    const action: TodoAction = {
      type: TodoActionTypes.UPDATE_TODO,
      payload: updatedItem
    };

    // then
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the REMOVE action', () => {
    // given
    const removedId = '1';
    const initialState = {
      [removedId]: {
        id: removedId,
        label: 'test',
        isCompleted: false
      }
    };
    const expectedState = {};

    // when
    const action: TodoAction = {
      type: TodoActionTypes.REMOVE_TODO,
      payload: removedId
    };

    // then
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });
});
