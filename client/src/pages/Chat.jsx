import React, { useState, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";

const appId = "ca2e9fc223264aa59fecda2bbcded5fc";

const client = AgoraRTM.createInstance(appId);

export default function Chat() {
	let [messages, setMessages] = useState([]);

	let inputUserId = useRef("");
	let inputMessage = useRef("");
	let inputPeerId = useRef("");

	client.on("MessageFromPeer", ({ text }, peerId) => {
		let newMessages = [
			...messages,
			`Message from: ${peerId}, Message: ${text}`,
		];
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
		let uid = `${inputUserId.current.value}`;
		console.log(uid);
		await client.login({ uid });
	};

	const logoutHandler = async () => {
		await client.logout();
	};

	const sendPeerMessage = async () => {
		let peerId = String(inputPeerId.current.value);
		let peerMessage = String(inputMessage.current.value);

		await client
			.sendMessageToPeer({ text: peerMessage }, peerId)
			.then((sendResult) => {
				if (sendResult.hasPeerReceived) {
					let newMessages = [
						...messages,
						`Message has been received by: ${peerId}, Message: ${peerMessage}`,
					];
					setMessages(newMessages);
				} else {
					let newMessages = [
						...messages,
						`Message sent to: ${peerId}, Message: ${peerMessage}`,
					];
					setMessages(newMessages);
				}
			});
	};

	return (
		<div className="mt-20">
			<h1>RTM Quickstart</h1>
			<form id="loginForm">
				<div className="col">
					<div className="card">
						<div className="row card-content">
							<div className="input-field">
								<label>User ID</label>
								<input
									ref={inputUserId}
									type="text"
									placeholder="User ID"
									id="userID"
								/>
							</div>
							<div className="row">
								<div>
									<button
										className="px-5"
										type="button"
										id="login"
										onClick={() => loginHandler()}
									>
										LOGIN
									</button>
									<button
										className="px-5"
										type="button"
										id="logout"
										onClick={() => logoutHandler()}
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
							<div className="input-field channel-padding">
								<label>Peer Message</label>
								<input
									ref={inputMessage}
									type="text"
									placeholder="peer message"
									id="peerMessage"
								/>
								<button
									onClick={() => sendPeerMessage()}
									type="button"
									id="send_peer_message"
								>
									SEND
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div>
				{messages.length ? (
					messages.map((mess, index) => (
						<p key={`${index}${mess}`}>{mess}</p>
					))
				) : (
					<h1>Empty</h1>
				)}
			</div>
		</div>
	);
}
