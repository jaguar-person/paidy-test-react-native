import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { TodoItem } from "./TodoItem";
import { useTodoContext } from "../contexts/TodoContext";
import { todosAsList } from "../selectors/todoSelectors";
import { useTodoHandlers } from "../hooks/useTodoHandlers";
import { InputBar } from "./InputBar";
import { ITodoItem } from "../models";

// Component that renders a list of todo items
export const TodoList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ITodoItem | null>(null);
  const selectedItemLabel = selectedItem ? selectedItem.label : "";
  const actionButtonText = selectedItem ? "UPDATE" : "ADD";

  const { state, dispatch } = useTodoContext();
  const todoList = todosAsList(state);
  const { handleAdd, handleToggle, handleLabelChange, handleRemove } =
    useTodoHandlers(state, dispatch);

  useEffect(() => {
    // reset the selected item when the state of todo list changes
    setSelectedItem(null);
  }, [state]);

  const handleButtonPress = (newLabel: string) => {
    if (selectedItem) {
      // if an item is selected, update the label of the item
      handleLabelChange(selectedItem.id, newLabel);
      setSelectedItem(null);
      return;
    }

    // otherwise, add a new item
    handleAdd(newLabel);
  };

  // show a confirmation dialog before removing an item
  const showRemoveConfirmation = (id: string) => {
    Alert.alert("Remove Item", "Are you sure to remove this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => handleRemove(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <InputBar
        initialLabel={selectedItemLabel}
        buttonText={actionButtonText}
        onSubmit={handleButtonPress}
      />
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TodoItem
            {...item}
            isSelected={selectedItem?.id === item.id}
            onToggle={() => handleToggle(item.id)}
            onItemSelected={() => {
              setSelectedItem(item);
            }}
            onRemove={() => showRemoveConfirmation(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
