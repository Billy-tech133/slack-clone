import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import firebase from "firebase";
import { auth } from "../firebase";
import { db } from "../firebase";
function ChatInput({ channelName, channelId, chatRef }) {
  //   const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(channelId);
    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Billy Brown",
      userImage:
        "https://drive.google.com/file/d/1cjPCujcg9z2N8bD2K5-0nqCrFObOkm-J/view?usp=sharing",
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  height: 100vh;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: "none";
  }
  > form > button {
    display: none !important;
  }
`;
