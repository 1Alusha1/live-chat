import { useState } from "react";
import cl from "./Header.module.css";

export default function Header({ room, userName, cb ,burger}) {
  return (
    <header className={cl["header"]}>
      <div className={cl["header-wrap"]}>
        <div className={cl["user-info"]}>
          <div onClick={burger.cb} className={cl["burger"]}>
            <span className={burger.active ? cl["active"] : ""}></span>
            <span className={burger.active ? cl["active"] : ""}></span>
            <span className={burger.active ? cl["active"] : ""}></span>
          </div>
          <div className="room"> Комната: {room}</div>
          <span>|</span>
          <div className="userName">Имя: {userName}</div>
        </div>
        <button onClick={cb}>leave</button>
      </div>
    </header>
  );
}
