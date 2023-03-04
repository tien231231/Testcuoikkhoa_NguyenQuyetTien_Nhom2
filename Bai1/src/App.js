import "./App.css";
import { TbArrowBarDown } from "react-icons/tb";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todo,
      isChecked: false,
    };

    if (todo !== "") {
      setAllTodos([...allTodos].concat(todoItem).reverse());
      setTodo("");
    }

    console.log(allTodos);
  };

  const getAllTodos = () => {
    let stored = JSON.parse(localStorage.getItem("todo"));

    if (stored) {
      setAllTodos(stored);
    }
  };

  const toggleChecked = (id) => {
    let updatedTodos = [...allTodos].map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }

      return todo;
    });

    setAllTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodo = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(filteredTodo);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodos));
  }, [allTodos]);
  const [language, setLanguage] = useState("en");
  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          {language === "en"
            ? `You have ${allTodos.length} tasks left`
            : `Bạn còn ${allTodos.length} việc phải làm`}
        </div>
        <div className="todo-list-container">
          {allTodos.map((todo) => (
            <ListItem
              key={todo.id}
              deleteTodo={() => deleteTodo(todo.id)}
              text={todo.text}
              isChecked={todo.isChecked}
              toggleChecked={() => toggleChecked(todo.id)}
            />
          ))}

          {allTodos.length === 0 && (
            <p className="empty">{language === "en"
            ? `There are no Todo's`
            : `Không có việc cần làm`}</p>
          )}
        </div>
        <form className="form" onSubmit={addTodo}>
          <input
            type={"text"}
            className="App_input"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {language === "en"
            ? <button onClick={addTodo}>Submit</button>
            : <button onClick={addTodo}>Nộp</button>}
          
        </form>
      </div>
      <div>
      
        <h3>Made by MindX 🔥</h3>
        <div>
          <span>Available on:</span>
          <span
            className={`languague-picker ${
              language === "vi" ? "selected" : ""
            }`}
            onClick={handleLanguageToggle}
          >
            🇻🇳
          </span>
          <span
            className={`languague-picker ${
              language === "en" ? "selected" : ""
            }`}
            onClick={handleLanguageToggle}
          >
            🇺🇸
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
