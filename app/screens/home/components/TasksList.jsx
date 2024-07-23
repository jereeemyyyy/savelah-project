import React from 'react';
import { FlatList } from 'react-native';
import TaskCard from './TaskCard';

const TasksList = ({ tasks, onAdd, onDelete }) => (
  <FlatList
    data={tasks}
    renderItem={({ item }) => (
      <TaskCard
        item={item}
        onAdd={onAdd}
        onDelete={onDelete}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
    contentContainerClassName="p-4"
  />
);

export default TasksList;
