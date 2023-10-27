import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import { TodoProvider } from '../contexts/TodoContext';
import { TodoList } from './TodoList';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn()
}));
const mockedAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe('TodoList Component', () => {
  const renderComponent = () => {
    return render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );
  };

  const addNewItem = (newItem: string) => {
    const input = screen.getByPlaceholderText('Please enter label...');
    fireEvent.changeText(input, newItem);
    fireEvent(input, 'blur');
    const addButton = screen.getByText('Add');
    fireEvent.press(addButton);
  };

  it('should able to add a new item', () => {
    // given
    const newItem = 'new item';
    renderComponent();
    addNewItem(newItem);

    // then
    expect(screen.getByText(newItem)).toBeDefined();
  });

  it('should able to toggle the completed state of an item', () => {
    // given
    const newItem = 'new item';
    renderComponent();
    addNewItem(newItem);

    // when
    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByRole('checkbox', { checked: false })).toBeDefined();
    fireEvent.press(checkbox);

    // then
    expect(screen.getByRole('checkbox', { checked: true })).toBeDefined();
  });

  it('should able to update the label of an item', () => {
    // given
    const newItem = 'new item';
    const updatedItem = 'updated item';
    renderComponent();
    addNewItem(newItem);

    // when
    const text = screen.getByText(newItem);
    fireEvent.press(text);
    const input = screen.getByDisplayValue(newItem);
    fireEvent.changeText(input, updatedItem);
    fireEvent(input, 'blur');
    const updateButton = screen.getByText('Update');
    fireEvent.press(updateButton);

    // then
    expect(screen.getByText(updatedItem)).toBeDefined();
  });

  it('should able to remove an item', async () => {
    // given
    const newItem = 'new item';
    renderComponent();
    addNewItem(newItem);

    // when
    const removeButton = screen.getByText('Remove');
    fireEvent.press(removeButton);

    // the code below is to simulate the user press the confirm button on the alert
    // this is needed because the alert is rendered outside the component
    // and the alert is not rendered immediately, so we need to wait for it to be rendered
    if (mockedAlert.mock.calls.length > 0 && mockedAlert.mock.calls[0][2]) {
      const confirmButton = mockedAlert.mock.calls[0][2][1];

      await waitFor(() => {
        if (confirmButton && confirmButton.onPress) {
          confirmButton.onPress();
        }
      });
    }

    // then
    expect(screen.queryByText(newItem)).toBeNull();
  });
});
