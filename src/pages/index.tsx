import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [todoList, setList] = useState([]);
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  async function fetchData() {
    setList(await invoke("show_list"))
    console.log('fetched', todoList);
  }

  async function addData() {
    setList(await invoke("add_todo"))
    console.log('fetched', todoList);
  }

  useEffect(() => {
    const fetchData = async () => {
      setList(await invoke("show_list"))
    }
    fetchData().catch(console.error);
    console.log('fetched', todoList);
  }, [])

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      todoList: { todoList }
      <div className="row">
        <span className="logos">
          <a href="https://nextjs.org" target="_blank">
            <Image
              width={144}
              height={144}
              src={nextLogo}
              className="logo next"
              alt="Next logo"
            />
          </a>
        </span>
        <span className="logos">
          <a href="https://tauri.app" target="_blank">
            <Image
              width={144}
              height={144}
              src={tauriLogo}
              className="logo tauri"
              alt="Tauri logo"
            />
          </a>
        </span>
        <span className="logos">
          <a href="https://reactjs.org" target="_blank">
            <Image
              width={144}
              height={144}
              src={reactLogo}
              className="logo react"
              alt="React logo"
            />
          </a>
        </span>
      </div>

      <p>Click on the Tauri, Next, and React logos to learn more.</p>

      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => greet()}>
            Greet
          </button> 
          <button type="button" onClick={() => fetchData()}>
            Fetch
          </button>
          <button type="button" onClick={() => addData()}>
            Add
          </button>
        </div>
      </div>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
