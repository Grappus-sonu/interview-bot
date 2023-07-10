import { createContext, useContext } from "react";
import io from "socket.io-client";

const socket = io("https://openmediavault-1.hawk-pike.ts.net/");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

socket.on("init", (event) => {
  console.log("Interviewer", event);
})

socket.on("interviewer-response", (event) => {
  console.log("Interviewer", event);
})

socket.on("interviewee-response", (event) => {
  console.log("Interviewer", event);
})

export const InterviewerContext = createContext<any>(null);
export const InterviewerSocket = socket