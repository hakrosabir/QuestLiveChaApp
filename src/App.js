import React, { useState } from "react";
import "./styles.css";

// Firebase Sdk
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDq6OMVLjueopGu2WG-vuZGVtx51nHo8pU",
  authDomain: "quest-live-chat-app.firebaseapp.com",
  projectId: "quest-live-chat-app",
  storageBucket: "quest-live-chat-app.appspot.com",
  messagingSenderId: "852082986286",
  appId: "1:852082986286:web:e98bab39de59ee9a113ebf",
  measurementId: "G-W3L6J1573B"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function app() {
  return (
    <div className="App">
      <header className="App">
        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </header>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
  };
  return <button onClick={signInWithGoogle}> Sign in with Google </button>;
}

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()}> Sign Out </button>
    )
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const querry = messageRef.orderBy("CreateAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFromValue] = useState("");

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <chatMessage key={msg.id} message={msg} />)}

        <form>
          <input />
          <button type="submit"> send </button>
        </form>
      </div>
    </>
  );
}

function chatMessage(props) {
  const { text, uid, photoUrl } = props.message;
  const messageCLass = uid === auth.currentUser.uid ? "sent" : "recieved";
  return;
  <div className={`message ${messageCLass}`}>
    <img src={photoUrl} />
    <p> {text} </p>
  </div>;
}

export default app;
