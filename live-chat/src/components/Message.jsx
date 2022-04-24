import cl from "./Message.module.css";

export default function Message(props) {
  return (
    <div className="message" ref={props.newRef}>
      {props.msg.map((item, index) =>
        item.system ? (
          <div className={[cl["message"], cl["center"]].join(" ")}>
            <div className={cl["system-message"]}>{item.msg}</div>
          </div>
        ) : (
          <div
            className={[
              cl["message"],
              item.id === props.user.id ? cl["r"] : cl["l"],
            ].join(" ")}
          >
            <div key={String(index)} className={cl["message-wrap"]}>
              <div className="user-name">{item.name}:</div>
              <div className={cl["user-message"]}>{item.msg}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
