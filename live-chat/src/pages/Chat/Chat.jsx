import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Message from "../../components/Message";
import cl from "./Chat.module.css";

export default function Chat({ socket }) {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const [msg, setMsg] = useState([]);
  const [user, setUser] = useState("");
  const [burgerActive, setBurgerActive] = useState(false);

  let messageBlock = createRef();
  let chatBody = createRef();

  useEffect(() => {
    chatBody.current.scrollTop = messageBlock.current.clientHeight;
  }, [msg]);

  const sendMessage = (e) => {
    if (e.keyCode === 13 && message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const leave = () => {
    socket.emit("leave");
    setMsg([]);
    setUserList([]);
    navigate("/");
  };

  const burger = () => {
    setBurgerActive(!burgerActive);
  };

  socket.on("systemMessage", (data) => setMsg([...msg, data]));

  socket.on("userList", (data) => {
    setUserList(data);
  });
  socket.on("rendermsg", (data) => setMsg([...msg, data]));

  socket.on("user", (data) => setUser(data));

  return (
    <>
      <Header
        burger={{
          cb: burger,
          active: burgerActive,
        }}
        room={user.room}
        userName={user.name}
        cb={leave}
      ></Header>

      <div className={cl["chat"]}>
        <div
          className={[cl["chat-users"], burgerActive ? cl["active"] : ""].join(
            " "
          )}
        >
          {userList.map((item, index) => (
            <p>{item.name}</p>
          ))}
        </div>
        <div
          ref={chatBody}
          className={[cl["chat-body"], burgerActive ? cl["active"] : ""].join(
            " "
          )}
        >
          <Message newRef={messageBlock} msg={msg} user={user}></Message>
        </div>
        <textarea
          type="text"
          onKeyDown={sendMessage}
          value={message}
          disabled={burgerActive}
          className={burgerActive ? cl["active"] : ""}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </>
  );
}
