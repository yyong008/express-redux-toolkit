import React, { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDelTodoMutation,
} from "../../apis/todo";
import { v4 as uuidv4 } from "uuid";

function CreateTodo() {
  const [v, setV] = useState("");
  const [addTodo] = useAddTodoMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setV(value);
  };

  const onSubmit = () => {
    if (!v) {
      alert("input todo");
      return;
    }

    addTodo({
      content: v,
      id: uuidv4(),
    });
    setV("");
  };
  return (
    <>
      <div className="flex space-x-5">
        <input
          className="px-4 w-3/6 border border-slate-500 rounded-md shadow-sm outline outline-2 outline-indigo-500"
          type="text"
          value={v}
          onChange={onChange}
          placeholder="please enter your todo"
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 font-semibold text-sm  text-slate-700 border border-slate-500 rounded-md shadow-sm outline outline-2 outline-indigo-500"
        >
          提交
        </button>
      </div>
    </>
  );
}

function TodoList() {
  const { data, isFetching, isLoading } = useGetTodosQuery("");
  const [updateTodo] = useUpdateTodoMutation();
  const [delTodo] = useDelTodoMutation();
  const [showEdit, setShowEdit] = useState(false);
  const [cur, setCur] = useState<any>({});
  const [] = useState("");

  if (isFetching) {
    return <div>isFetching ... </div>;
  }

  if (isLoading) {
    return <div>isLoading ... </div>;
  }

  const handleClickItem = (i) => {
    if (i.id === cur.id) {
      setShowEdit(false);
      setCur({});
    } else {
      setShowEdit(true);
      setCur(i);
    }
  };

  const onTextAreaChange = (e) => {
    const { value } = e.target;
    setCur({
      ...cur,
      content: value
    })
  };

  const handleMod = (i) => {
    updateTodo(i);
  };

  const handleDel = (i) => {
    delTodo(i);
    setShowEdit(false)
  };

  return (
    <div className="flex space-x-5 space-y-5">
      <ul className="w-3/5 py-4 space-y-2">
        {[...data].reverse()?.map((i: any) => {
          return (
            <li
              className={`${cur.id === i.id
                ? "outline outline-1 outline-indigo-500 rounded-md text-cyan-700"
                : ""
                } leading-[2.5rem] h-10`}
              key={i.id}
              onClick={() => handleClickItem(i)}
            >
              - {i.content}
            </li>
          );
        })}
      </ul>
      {showEdit ? (
        <div>
          <div className="space-x-4">
            <button
              onClick={() => handleMod(cur)}
              className="px-4 py-2 font-semibold text-sm  text-slate-700 border  rounded-md shadow-sm outline outline-1 outline-indigo-500"
            >
              修改
            </button>
            <button
              onClick={() => handleDel(cur)}
              className="px-4 py-2 font-semibold text-sm  text-slate-700 border  rounded-md shadow-sm outline outline-1 outline-indigo-500"
            >
              删除
            </button>
          </div>

          <div className="flex flex-col">
            <span className="my-6">id: {cur.id}</span>
            <textarea
              className="px-1 w-full borde rounded-md shadow-sm outline outline-1 outline-indigo-500"
              value={cur.content}
              onChange={onTextAreaChange}
            ></textarea>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TodoListApp = () => {
  return (
    <div className="flex flex-col w-full px-20 py-10">
      <CreateTodo />
      <TodoList />
    </div>
  );
};

export default TodoListApp;
