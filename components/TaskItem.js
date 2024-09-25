import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ item, toggleTask }) => {
  return (
    <TouchableOpacity onPress={toggleTask}>
      <Text style={[styles.taskText, item.done && styles.done]}>{item.task}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskText: {
    fontSize: 18,
    paddingVertical: 10,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskItem;
