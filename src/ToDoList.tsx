import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: "Write To Do List" })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
