import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import EmailList from "./components/EmailList";

export default function Home() {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const [showPrevMails, setShowPrevMails] = useState(false);
  const [prevMails, setPrevMails] = useState([]);

  useEffect(() => {
    if ( nameInputRef.current.value ) {
      document.title = 'Welcome ' + nameInputRef.current.value;
    } else {
      document.title = 'Motivation Booster';
    }
  })

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    console.log(enteredEmail, enteredName);

    fetch("http://localhost:8080/addUser", { //http://localhost:8080/addUser" /api/users
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: enteredName, email: enteredEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success from index:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadPrevMailsHandler = () => {
    setShowPrevMails(!showPrevMails);

    fetch("/api/mails")
      .then((response) => response.json())
      .then((data) => {
        setPrevMails(data.mails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Motivate Yourself with Motivation Booster!</h1>

        <div className="description">
          <p>
            Have You ever felt unmotivated to do things you really need to be
            doing?
          </p>
          <p>
            Sing in now and get motivational emails wrote by Artificial
            Intelligence using ChatGPT
          </p>
        </div>

        <form onSubmit={submitFormHandler}>
          <div className="email">
            <input placeholder="Your Email" type="email" id="email" ref={emailInputRef} />
          </div>
          <div className="name">
            <input placeholder="Your name" type="text" rows="5" ref={nameInputRef}></input>
          </div>
          <button type="submit"> Sing Me In</button>
        </form>

        <h3>Here You can check previously sent emails to our follwers!</h3>
        {!showPrevMails ? (
          <button
            type="submit"
            className="button"
            onClick={loadPrevMailsHandler}
          >
            Show recently sent emails
          </button>
        ) : (
          <div>
            <button
              type="submit"
              className="button"
              onClick={loadPrevMailsHandler}
            >
              Hide recently sent emails
            </button>
            <EmailList
              emails={prevMails.slice(prevMails.length - 3, prevMails.length)}
            />
          </div>
        )}
      </main>
    </>
  );
}
