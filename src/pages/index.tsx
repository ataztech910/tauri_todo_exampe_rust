import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const App = () => {
  const [todoList, setList] = useState([]);
  const [description, setDescription] = useState('');

  async function fetchData() {
    setList(await invoke("show_list"))
  }

  const initTodo = async () => {
    if (description === '') return false;
    const result: string = await invoke("add_todo", { description });
    const renderedList: Partial<any>[] = Array.from(JSON.parse(result))
    setList(renderedList);
  }

  async function addData() {
    initTodo();
    await setDescription("")
  }

  const resolveItem = async (index: number, status: boolean) => {
    const result: string = await invoke("change_state", { index,  status});
    const renderedList: Partial<any>[] = Array.from(JSON.parse(result))
    setList(renderedList);
  }

  const removeItem = async (index: number) => {
    const result: string = await invoke("remove_item", { index });
    const renderedList: Partial<any>[] = Array.from(JSON.parse(result))
    setList(renderedList);
  }

  useEffect(() => {
    const fetchData = async () => {
      initTodo();
    }
    fetchData().catch(console.error);
  }, []);

  const listItems = Array.isArray(todoList) && todoList.map((todoElement, index) => {
    const classToState = todoElement.status? 'resolved' : '';
    const resolveLabel = todoElement.status? 'un-resolve' : 'resolve';
    return (<li className={`todo-item ${classToState}`} key={index}>
      <div className="todo-item__layout">
        <div>{todoElement.description}</div>
        <div>
          <button type="button" onClick={() => resolveItem(index, !todoElement.status)}>{resolveLabel}</button>
          <button type="button" onClick={() => removeItem(index)}>remove</button>
        </div>
      </div>
    </li>)
    }
  );

  return (
    <div className="container">
      <div className="row">
        <div>
          <input
            id="description"
            value = {description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Enter a todo description..."
          />
          <button type="button" onClick={() => addData()}>Add</button>
        </div>
      </div>

      <ul>{listItems}</ul>

    </div>
  );
}

export default App;
