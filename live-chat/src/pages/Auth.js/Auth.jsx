import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from "./Auth.module.css";
export default function Auth({ socket }) {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (room.trim() !== "" && name.trim() !== "") {
      if (name.length < 8) {
        socket.emit("join", { name: name, room: room });
        navigate(`/chat`);
        setFlag(false);
      } else {
        setFlag(true);
        setError("Имя доожно быть короче 8 символов");
      }
    } else {
      setError("Поля должны бить заполнены!");
      setFlag(true);
    }
  };

  return (
    <div className={cl["chat-auth"]}>
      <form onSubmit={send}>
        <label>
          <p>Название комнаты:</p>
          <input
            type="text"
            className={flag ? cl.wrong : ""}
            onChange={(e) => setRoom(e.target.value)}
          />
        </label>
        <label>
          <p>Имя пользователя:</p>
          <input
            type="text"
            className={flag ? cl.wrong : ""}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label style={{ display: "block" }}>
          <input type="submit" />
        </label>
      </form>
      {flag && <p className={flag ? cl.wrong : ""}>{error}</p>}
    </div>
  );
}
