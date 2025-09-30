import { useState } from "react";

export const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.taskName);

  const handleSave = () => {
    props.editTask(props.id, editedName);
    setIsEditing(false);
  };

  return (
    <div
      className="task"
      style={{
        backgroundColor: props.completed ? "#a0e6a0" : "#fff",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={() => setIsEditing(false)}>✖</button>
        </>
      ) : (
        <>
          <h1
            style={{
              flex: 1,
              margin: 0,
              textDecoration: props.completed ? "line-through" : "none",
              color: props.completed ? "#555" : "#333",
            }}
          >
            {props.taskName}
          </h1>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => props.deleteTask(props.id)}>🗑️</button>
            <button onClick={() => props.completeTask(props.id)}>✔️</button>
          </div>
        </>
      )}
    </div>
  );
};
