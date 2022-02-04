import React from "react";

function ToDoItems(props) {
  return (
    <li
      onClick={() => {
        props.onChecked(props.id);
      }}
      title="Click to delete!"
    >
      {props.text}
    </li>
  );
}

export default ToDoItems;