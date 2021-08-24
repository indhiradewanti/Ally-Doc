import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";

const appId = "ca2e9fc223264aa59fecda2bbcded5fc";
const client = AgoraRTM.createInstance(appId);
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "id-ID";

export default function Chat() {
  let [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  let inputUserId = useRef("");
  let inputMessage = useRef("");
  let inputPeerId = useRef("");

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    sendPeerMessage();

    // setMessages("")
    // setMessages([...messages, note]);
    // setNote("");
  };
  // console.log(note);
  client.on("MessageFromPeer", ({ text }, peerId) => {
    let newMessages = [...messages, `${peerId}, ${text}`];
    setMessages(newMessages);
  });

  client.on("ConnectionStateChanged", (state, reason) => {
    let newMessages = [...messages, `State changed to ${state} reason: ${reason}`];
    setMessages(newMessages);
  });

  const loginHandler = async () => {
    let uid = `${inputUserId.current.value}`;
    console.log(uid);
    await client.login({ uid });
  };
  let userId = String(inputUserId.current.value);

  const logoutHandler = async () => {
    await client.logout();
  };
  const sendPeerMessage = async () => {
    let peerId = String(inputPeerId.current.value);
    let userId = String(inputUserId.current.value);
    let peerMessage = String(inputMessage.current.value);

    await client.sendMessageToPeer({ text: peerMessage }, peerId, userId).then((sendResult) => {
      if (sendResult.hasPeerReceived) {
        let newMessages = [...messages, `${userId},${peerMessage}`];
        setMessages(newMessages);
      } else {
        let newMessages = [...messages, `Message sent to: ${peerId}, Message: ${peerMessage}`];
        setMessages(newMessages);
      }
    });
  };

  return (
    <div className="relative inset-y-20">
      <div className="flex he antialiased text-gray-800">
        <div className="flex flex-row new-h w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-brown new-bg h-10 w-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <div className="ml-2 text-2xl caslon">Messanger</div>
            </div>
            <div className="flex flex-col items-center new-bg border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img src="https://avatars3.githubusercontent.com/u/2763884?s=128" alt="Avatar" className="h-full w-full" />
              </div>
              <div className="text-sm font-semibold mt-2">Nama Dokter</div>
              <div className="text-xs text-gray-500">Spesialis</div>
            </div>
          </div>
          <div className="flex flex-col flex-auto px-6 py-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl chat-bg h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="mt-20">
                    <h1>RTM Quickstart</h1>
                    <form id="loginForm">
                      <div className="col">
                        <div className="card">
                          <div className="row card-content">
                            <div className="input-field">
                              <label>User ID</label>
                              <input ref={inputUserId} type="text" placeholder="User ID" id="userID" />
                            </div>
                            <div className="row">
                              <div>
                                <button className="px-5" type="button" id="login" onClick={() => loginHandler()}>
                                  LOGIN
                                </button>
                                <button className="px-5" type="button" id="logout" onClick={() => logoutHandler()}>
                                  LOGOUT
                                </button>
                              </div>
                            </div>
                            <div className="input-field">
                              <label>Peer Id</label>
                              <input ref={inputPeerId} type="text" placeholder="peer id" id="peerId" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages.length > 1 && (
                      <div className="grid">
                        {messages.map((mess, index) => (
                          <div key={`${index}${mess}`}>
                            {mess !== "State changed to CONNECTING reason: LOGIN" && mess !== "State changed to CONNECTED reason: LOGIN_SUCCESS" && (
                              <div className="grid">
                                {mess.split(",")[0] === userId ? (
                                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                    <div className="flex items-center justify-start flex-row-reverse">
                                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                                      <div className="relative mr-3 text-sm nudebrown text-white py-2 px-4 shadow rounded-xl">
                                        <div>{mess.split(",")[1]}</div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                    <div className="flex flex-row items-center">
                                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                        <div>{mess.split(",")[1]}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" id="peerMessage" ref={inputMessage} />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 -mt-1" onClick={() => setIsListening((prevState) => !prevState)}>
                      {isListening ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center brown-bg hover:bg-brown rounded-xl text-white px-4 py-1 flex-shrink-0" id="send_peer_message" onClick={handleSaveNote}>
                    <span>Send</span>
                    <span className="ml-2">
                      <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* {savedNotes &&
                      savedNotes.map((n) => (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg" key={n}>
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                            <div className="relative mr-3 text-sm nudebrown text-white py-2 px-4 shadow rounded-xl">
                              <div>{n}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                     */
}

// {chatUserId.map((mess, index) => (
//   <div className="col-start-6 col-end-13 p-3 rounded-lg" key={`${index}${mess}`}>
//     <div className="flex items-center justify-start flex-row-reverse">
//       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
//       <div className="relative mr-3 text-sm nudebrown text-white py-2 px-4 shadow rounded-xl">
//         <div>{mess}</div>
//       </div>
//     </div>
//   </div>
// ))}
// </div>
