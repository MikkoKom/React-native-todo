import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import InputField from './components/InputField';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Load tasks from AsyncStorage on app launch
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever taskList changes
  useEffect(() => {
    saveTasks();
  }, [taskList]);

  const addTask = () => {
    if (task.trim().length > 0) {
      setTaskList([...taskList, { task: task, done: false }]);
      setTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = taskList.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTaskList(updatedTasks);
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
    } catch (error) {
      console.log('Error saving tasks', error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem('taskList');
      if (tasks !== null) {
        setTaskList(JSON.parse(tasks));
      }
    } catch (error) {
      console.log('Error loading tasks', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <InputField task={task} setTask={setTask} addTask={addTask} />
      <FlatList
        data={taskList}
        renderItem={({ item, index }) => (
          <TaskItem item={item} toggleTask={() => toggleTask(index)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
