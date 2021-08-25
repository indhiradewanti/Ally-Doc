import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import AgoraRTC from "agora-rtc-sdk-ng";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filter } from "../stores/actions/actionDoctorUser";

const appId = "ca2e9fc223264aa59fecda2bbcded5fc";
const client = AgoraRTM.createInstance(appId);
const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

let rtc = {
	localAudioTrack: null,
	localVideoTrack: null,
	client: null,
};

mic.continuous = true;
mic.interimResults = true;
mic.lang = "id-ID";

export default function Chat() {
	let isLogged = useSelector((state) => state.doctorUser.isLogin);
	let filtered = useSelector((state) => state.doctorUser.filterUserDoctor);
	let { id } = useParams();
	let dispatch = useDispatch();
	let [messages, setMessages] = useState([]);
	const [isListening, setIsListening] = useState(false);
	const [isVideoCall, setIsVideoCall] = useState(false);
	const [isCall, setIsCall] = useState(false);

	// let inputUserId = useRef("");
	let inputMessage = useRef("");
	let inputPeerId = isLogged === "user" ? filtered.doctorId : filtered.userId;
	let userId = isLogged === "user" ? filtered.userId : filtered.doctorId;

	let options = {
		appId: "ca2e9fc223264aa59fecda2bbcded5fc",
		channel: `${filtered.userId}${filtered.doctorId}`, // Untuk channel, harus sama untuk 2 orang bisa dikonek (ObjectId(User) + ObjectId(Doctor))
		token: null,
		uid:
			isLogged === "user"
				? String(filtered.userId)
				: String(filtered.doctorId), // "test",
	};

	console.log(filtered, `ini filtered`);

	// CHAT
	useEffect(() => {
		handleListen();
	}, [isListening]);

	useEffect(() => {}, []);

	useEffect(() => {
		loginHandler();
	}, []);

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
			inputMessage.current.value = transcript;
			mic.onerror = (event) => {
				console.log(event.error);
			};
		};
	};

	const handleSaveNote = () => {
		sendPeerMessage();
		inputMessage.current.value = "";
	};

	client.on("MessageFromPeer", ({ text }, peerId) => {
		let newMessages = [...messages, `${peerId}, ${text}`];
		setMessages(newMessages);
	});

	client.on("ConnectionStateChanged", (state, reason) => {
		let newMessages = [
			...messages,
			`State changed to ${state} reason: ${reason}`,
		];
		setMessages(newMessages);
	});

	const loginHandler = async () => {
		// let uid = isLogged === "user" ? filtered.userId : filtered.doctorId;
		console.log(options.uid, "ini uid");
		await client.login({ uid: options.uid });
	};

	const logoutHandler = async () => {
		await client.logout();
	};
	const sendPeerMessage = async () => {
		let peerId = isLogged === "user" ? filtered.doctorId : filtered.userId;
		let userId = isLogged === "user" ? filtered.userId : filtered.doctorId;
		let peerMessage = inputMessage.current.value;

		await client
			.sendMessageToPeer({ text: peerMessage }, peerId, userId)
			.then((sendResult) => {
				if (sendResult.hasPeerReceived) {
					let newMessages = [...messages, `${userId},${peerMessage}`];
					setMessages(newMessages);
				} else {
					let newMessages = [...messages, `${userId},${peerMessage}`];
					setMessages(newMessages);
				}
			});
	};

	// VIDEO

	const [joined, setJoined] = useState(false);
	const channelRef = useRef("");
	const remoteRef = useRef("");
	const leaveRef = useRef("");

	async function handleSubmit(e) {
		try {
			setIsVideoCall(true);
			setJoined(true);

			rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

			await rtc.client.join(
				options.appId,
				options.channel,
				options.token,
				options.uid
			);

			rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

			rtc.localVideoTrack.play("local-stream");

			rtc.client.on("user-published", async (user, mediaType) => {
				await rtc.client.subscribe(user, mediaType);
				console.log("subscribe success");

				if (mediaType === "video" || mediaType === "all") {
					const remoteVideoTrack = user.videoTrack;
					console.log(remoteVideoTrack);

					const PlayerContainer = React.createElement("div", {
						id: user.uid,
						style: { height: "360px", width: "520px" }, // Untuk ngubah ukuran video client
					});
					ReactDOM.render(
						PlayerContainer,
						document.getElementById("remote-stream")
					);

					user.videoTrack.play(`${user.uid}`);
				}

				if (mediaType === "audio" || mediaType === "all") {
					const remoteAudioTrack = user.audioTrack;
					remoteAudioTrack.play();
				}
			});

			rtc.client.on("user-unpublished", (user) => {
				const playerContainer = document.getElementById(user.uid);
				console.log(playerContainer);
			});

			await rtc.client.publish([
				rtc.localAudioTrack,
				rtc.localVideoTrack,
			]);

			console.log("publish success!");
		} catch (error) {
			console.error(error);
		}
	}

	async function handleLeave() {
		try {
			setIsVideoCall(false);
			const localContainer = document.getElementById("local-stream");

			rtc.localAudioTrack.close();
			rtc.localVideoTrack.close();

			setJoined(false);
			localContainer.textContent = "";

			rtc.client.remoteUsers.forEach((user) => {
				const playerContainer = document.getElementById(user.uid);
				playerContainer && playerContainer.remove();
			});

			await rtc.client.leave();
		} catch (err) {
			console.error(err);
		}
	}

	// CALL

	const startBasicCall = async () => {
		rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
		rtc.client.on("user-published", async (user, mediaType) => {
			await rtc.client.subscribe(user, mediaType);
			console.log("subscribe success");

			if (mediaType === "audio") {
				const remoteAudioTrack = user.audioTrack;
				remoteAudioTrack.play();
			}

			rtc.client.on("user-unpublished", async (user) => {
				await rtc.client.unsubscribe(user);
			});
		});
	};
	const joinHandler = async () => {
		await rtc.client.join(
			options.appId,
			options.channel,
			options.token,
			options.uid
		);
		rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		await rtc.client.publish([rtc.localAudioTrack]);
		console.log("publish success!");
	};

	const leaveHandler = async () => {
		// if (!isLogged === "user" ? filtered.userId : filtered.doctorId) {
		setIsCall(false);
		rtc.localAudioTrack.close();
		await rtc.client.leave();
		// } else {
		// setIsCall(false);
		// rtc.localAudioTrack.close();
		// await rtc.client.leave();
		// }
	};

	const call = () => {
		startBasicCall();
		setIsCall(true);
		joinHandler();
	};

	return (
		<div className="relative inset-y-20 bg-white h-screen">
			<div className="flex he antialiased text-gray-800">
				<div className="flex flex-row new-h w-full overflow-x-hidden">
					<div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0">
						<div className="flex flex-row items-center justify-center h-12 w-full">
							<div className="flex items-center justify-center rounded-2xl text-brown new-bg h-10 w-10">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
									></path>
								</svg>
							</div>
							<div className="ml-2 text-3xl caslon">
								Messanger
							</div>
						</div>
						<div className="flex flex-col items-center new-bg border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
							<img
								src={
									isLogged === "user"
										? filtered.doctorPhoto
										: filtered.userPhoto
								}
								alt="Avatar"
								className="mask mask-circle h-32"
							/>
							<div className="text-lg font-semibold mt-2">
								{isLogged === "user"
									? filtered.doctorName
									: filtered.userName}
							</div>
							<div className="text-lg text-gray-500">
								{isLogged === "user"
									? filtered.doctorSpecialist
									: filtered.userGender}
							</div>
							<button className="btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-32">
								End Chat
							</button>
						</div>
						<button
							className="flex flex-row items-center justify-center h-12 w-full mt-20 py-10 transition-transform transform hover:scale-110"
							onClick={call}
							disabled={isVideoCall || isCall ? true : false}
						>
							{!isCall && !isVideoCall ? (
								<div className="flex items-center justify-center rounded-full text-brown bg-green h-32 w-32">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-14 w-14"
										viewBox="0 0 20 20"
										fill="white"
									>
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
									</svg>
								</div>
							) : (
								<div className="flex items-center justify-center rounded-full text-brown new-bg h-32 w-32">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-14 w-14"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/>
									</svg>
								</div>
							)}
						</button>
						<button
							className="flex flex-row items-center justify-center h-12 w-full mt-20  transition-transform transform hover:scale-110"
							onClick={() => handleSubmit()}
							disabled={isVideoCall || isCall ? true : false}
						>
							{!isCall && !isVideoCall ? (
								<div className="flex items-center justify-center rounded-full text-brown bg-green h-32 w-32">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-14 w-14"
										viewBox="0 0 20 20"
										fill="white"
									>
										<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
									</svg>
								</div>
							) : (
								<div className="flex items-center justify-center rounded-full text-brown new-bg h-32 w-32">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-14 w-14"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								</div>
							)}
						</button>
						{/* {!isVideoCall && !isCall && (
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
													<button
														className="px-5"
														type="button"
														id="login"
														onClick={() =>
															loginHandler()
														}
													>
														LOGIN
													</button>
													<button
														className="px-5"
														type="button"
														id="logout"
														onClick={() =>
															logoutHandler()
														}
													>
														LOGOUT
													</button>
												</div>
											</div>
											<div className="input-field">
												<label>Peer Id</label>
												<input
													ref={inputPeerId}
													type="text"
													placeholder="peer id"
													id="peerId"
												/>
											</div>
										</div>
									</div>
								</div>
							</form>
						)} */}
					</div>
					<div className="flex flex-col flex-auto px-6 py-6">
						{isVideoCall && (
							<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl chat-bg h-full p-4">
								<div className="flex flex-col h-full overflow-x-auto mb-4">
									<div className="flex flex-col h-full mt-12 items-center">
										<div className="">
											{joined ? (
												<div className="grid grid-flow-col grid-cols-2 gap-36">
													<div>
														<div className="ml-2 text-3xl vogue font-bold">
															Nama kita
														</div>
														<div className="w-24 h-2 bg-green mb-6 mx-auto"></div>

														<div
															id="local-stream"
															className=""
															style={{
																height: "360px",
																width: "520px",
															}} // Untuk ngubah ukuran video sendiri
														></div>
													</div>
													<div>
														<div className="ml-2 text-3xl vogue font-bold">
															Nama Dokter
														</div>
														<div className="w-24 h-2 bg-green mb-6 mx-auto"></div>
														<div
															id="remote-stream"
															ref={remoteRef}
															style={{
																height: "360px",
																width: "520px",
															}}
														></div>
													</div>
												</div>
											) : null}
										</div>
										<button
											className="flex items-center justify-center transition-transform transform hover:scale-105"
											onClick={handleLeave}
										>
											<div className="flex items-center justify-center rounded-full bg-green h-20 w-20 mt-10">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="white"
												>
													<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
													<path d="M16.707 3.293a1 1 0 010 1.414L15.414 6l1.293 1.293a1 1 0 01-1.414 1.414L14 7.414l-1.293 1.293a1 1 0 11-1.414-1.414L12.586 6l-1.293-1.293a1 1 0 011.414-1.414L14 4.586l1.293-1.293a1 1 0 011.414 0z" />
												</svg>
											</div>
										</button>
										{/* <div className="container">
											<input
												type="submit"
												value="Join"
												onClick={handleSubmit}
												disabled={joined ? true : false}
											/>
											<input
												type="button"
												ref={leaveRef}
												value="Leave"
												onClick={handleLeave}
												disabled={joined ? false : true}
											/>
											<input
												type="text"
												ref={inputUserId}
												className="border"
											/>
										</div> */}
									</div>
								</div>
							</div>
						)}
						{isCall && (
							<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl chat-bg h-full p-4">
								<div className="flex flex-col h-full overflow-x-auto mb-4">
									<div className="flex flex-col h-full mt-12 items-center mx-auto">
										<div>
											<div className="ml-2 text-3xl vogue font-bold">
												Nama
											</div>
											<div className="w-24 h-2 bg-green mx-auto"></div>
										</div>
										<div className="p-20">
											<div class="avatar online">
												<div class="rounded-btn w-64 h-64">
													<img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
												</div>
											</div>
										</div>
										<button
											className="flex items-center justify-center transition-transform transform hover:scale-105"
											onClick={() => leaveHandler()}
										>
											<div className="flex items-center justify-center rounded-full bg-green h-20 w-20">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="white"
												>
													<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
													<path d="M16.707 3.293a1 1 0 010 1.414L15.414 6l1.293 1.293a1 1 0 01-1.414 1.414L14 7.414l-1.293 1.293a1 1 0 11-1.414-1.414L12.586 6l-1.293-1.293a1 1 0 011.414-1.414L14 4.586l1.293-1.293a1 1 0 011.414 0z" />
												</svg>
											</div>
										</button>
									</div>
								</div>
							</div>
						)}
						{!isVideoCall && !isCall && (
							<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl chat-bg h-full p-4">
								<div className="flex flex-col h-full overflow-x-auto mb-4">
									<div className="flex flex-col h-full">
										{messages.length > 1 &&
											messages.map((mess, index) => (
												<div
													className="grid grid-cols-12 gap-y-2"
													key={`${index}${mess}`}
												>
													{mess !==
														"State changed to CONNECTING reason: LOGIN" &&
														mess !==
															"State changed to CONNECTED reason: LOGIN_SUCCESS" &&
														(mess.split(",")[0] ===
														userId ? (
															<div className="col-start-6 col-end-13 p-3 rounded-lg">
																<div className="flex items-center justify-start flex-row-reverse">
																	<div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
																		{isLogged ===
																		"user"
																			? filtered
																					.userName[0]
																			: filtered
																					.doctorName[0]}
																	</div>
																	<div className="relative mr-3 text-lg bg-indigo-100 py-2 px-4 shadow rounded-xl">
																		<div>
																			{
																				mess.split(
																					","
																				)[1]
																			}
																		</div>
																	</div>
																</div>
															</div>
														) : (
															<div className="col-start-1 col-end-8 p-3 rounded-lg">
																<div className="flex flex-row items-center">
																	<div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
																		{isLogged ===
																		"user"
																			? filtered
																					.doctorName[0]
																			: filtered
																					.userName[0]}
																	</div>
																	<div className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
																		<div>
																			{
																				mess.split(
																					","
																				)[1]
																			}
																		</div>
																	</div>
																</div>
															</div>
														))}
												</div>
											))}
									</div>
								</div>
								<div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
									<div>
										<button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
												></path>
											</svg>
										</button>
									</div>
									<div className="flex-grow ml-4">
										<div className="relative w-full">
											<input
												type="text"
												className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
												id="peerMessage"
												ref={inputMessage}
											/>

											<button
												className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 -mt-1"
												onClick={() =>
													setIsListening(
														(prevState) =>
															!prevState
													)
												}
											>
												{isListening ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
															clipRule="evenodd"
														/>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
														/>
													</svg>
												)}
											</button>
										</div>
									</div>
									<div className="ml-4">
										<button
											className="flex items-center justify-center brown-bg hover:bg-brown rounded-xl text-white px-4 py-1 flex-shrink-0"
											id="send_peer_message"
											onClick={handleSaveNote}
										>
											<span>Send</span>
											<span className="ml-2">
												<svg
													className="w-4 h-4 transform rotate-45 -mt-px"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
													></path>
												</svg>
											</span>
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
