import React, {useState} from 'react';

export interface ISelectedToDo {
  id: string;
  index: number;
}

export const useEditToDo = () => {
  const [todo, setToDo] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<ISelectedToDo | null>(
    null,
  );

  return {
    selectedTodoId,
    setSelectedTodoId,
    todo,
    setToDo,
  };
};
