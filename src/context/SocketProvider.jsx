import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { decodedToken } from "../utils/jwt";
import { getSocketUrl } from "../helpers/config/envConfig";
import { SocketContext } from "./socket-context";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState();

  // Track token change — this picks up token after login
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get("pianofesta_accessToken");
      setToken((prevToken) =>
        prevToken !== currentToken ? currentToken : prevToken
      );
    }, 1000); // check every 1s — adjust if needed

    return () => clearInterval(interval);
  }, []);

  // Create socket when token is set and valid
  useEffect(() => {
    if (!token) return;

    const user = decodedToken(token);
    if (!user) {
      Cookies.remove("pianofesta_accessToken");
      toast.error("Invalid token. Please log in again.");
      return;
    }

    const socketInstance = io(getSocketUrl(), {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () =>
      console.log("Connected to socket server")
    );
    socketInstance.on("disconnect", () =>
      console.error("Disconnected from socket server")
    );
    socketInstance.on("connect_error", (error) =>
      console.error(`Connection error: ${error.message}`)
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
