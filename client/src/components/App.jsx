import React, { useEffect, useState } from "react";
import Axios from "axios";
import ToDoItems from "./ToDoItems";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001").then((res)=>{
      setItems(res.data);
    });
  });

  function addItem(inputText) {

    Axios.post("http://localhost:3001", {
      item: inputText
    });
  }

  function deleteItem(id) {
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
        {/* looping through list items */}
          {items.map((item) => (
            <ToDoItems
              key={item._id}
              id={item._id}
              text={item.item}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
