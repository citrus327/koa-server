import { Button } from "./component/button";
import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import type { Socket } from "socket.io-client";

const App = () => {
  const [messages, setMessages] = useState<{ message: string; user: string }[]>(
    []
  );
  const [message, setMessage] = useState("");
  const $socket = useRef<Socket>();

  useEffect(() => {
    if (!$socket.current) {
      $socket.current = (window as any).io(
        window.location.protocol + "//" + window.location.host,
        {
          path: "/my-sockets",
        }
      );
    }

    $socket.current.on("chat message", (e) => {
      setMessages((v) => {
        return [...v, e];
      });
    });

    $socket.current.on("reload", (e) => {
      window.location.reload();
    });
  }, []);

  return (
    <main>
      <ul id="messages">
        {messages.map((o) => {
          return <li>{o.message}</li>;
        })}
      </ul>
      <form id="form">
        <input
          id="input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            if (message) {
              $socket.current!.emit("chat message", message);
              setMessage("");
            }
          }}
        >
          Send
        </button>
        <Button />
      </form>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
