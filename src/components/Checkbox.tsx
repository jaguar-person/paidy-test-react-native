import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  isChecked: boolean;
  onToggle: () => void;
  size?: number;
  style?: ViewStyle;
}

// Custom checkbox component
export const Checkbox: React.FC<IProps> = ({
  isChecked,
  onToggle,
  size = 24,
  style
}) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole='checkbox'
      accessibilityState={{ checked: isChecked }}
      onPress={onToggle}
      style={[styles.container, style]}
    >
      {isChecked ? (
        <MaterialIcons name='check-box' size={size} color='black' />
      ) : (
        <MaterialIcons
          name='check-box-outline-blank'
          size={size}
          color='black'
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
