import React, { useState, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";

export default function Chat() {
	let [messages, setMessages] = useState([]);

	let inputUserId = useRef("");
	let inputMessage = useRef("");
	let inputPeerId = useRef("");
	let inputChannelMessage = useRef("");

	let [userId, setUserId] = useState("");

	let options = {
		uid: `${userId}`,
		token: "006a71ad7d579c44e188bf98de217c53964IAALWGH4+EztS9TNg48f2fhA4JMKzGkCGz+CgvfyBpC9CAZa8+gAAAAAEAB1cLwP0nQjYQEAAQDSdCNh",
	};

	const appID = "a71ad7d579c44e188bf98de217c53964";

	const client = AgoraRTM.createInstance(appID);

	client.on("MessageFromPeer", (message, peerId) => {
		let newMessages = [
			...messages,
			`Message from: ${peerId}, Message: ${message}`,
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

	let channel = client.createChannel("testing");

	channel.on("MemberJoined", (memberId) => {
		let newMessages = [...messages, `${memberId} joined the channel`];
		setMessages(newMessages);
	});

	channel.on("MemberLeft", (memberId) => {
		let newMessages = [...messages, `${memberId} left the channel`];
		setMessages(newMessages);
	});

	const loginHandler = async () => {
		console.log(options);
		await client.login(options);
	};

	const logoutHandler = async () => {
		await client.logout();
	};

	const createAndJoinChannel = async () => {
		await channel.join().then(() => {
			let newMessages = [
				...messages,
				`You have successfully joined channel ${channel.channelId}`,
			];
			setMessages(newMessages);
		});
	};

	const leaveChannel = async () => {
		if (channel !== null) {
			await channel.leave();
		} else {
			console.log("Channel is empty");
		}
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

	const sendChannelMessage = async () => {
		let channelMessage = String(inputChannelMessage.current.value);
		if (channel !== null) {
			await channel.sendMessage({ text: channelMessage }).then(() => {
				let newMessages = [
					...messages,
					`Channel message: ${channelMessage}, from ${channel.channelId}`,
				];
				setMessages(newMessages);
			});
		}
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
									// ref={inputUserId}
									onChange={(e) => setUserId(e.target.value)}
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
								<label>Channel name: demoChannel</label>
							</div>
							<div className="row">
								<div>
									<button
										className="px-5"
										type="button"
										id="join"
										onClick={() => createAndJoinChannel()}
									>
										JOIN
									</button>
									<button
										className="px-5"
										type="button"
										id="leave"
										onClick={() => leaveChannel()}
									>
										LEAVE
									</button>
								</div>
							</div>
							<div className="input-field channel-padding">
								<label>Channel Message</label>
								<input
									ref={inputChannelMessage}
									type="text"
									placeholder="channel message"
									id="channelMessage"
								/>
								<button
									onClick={() => sendChannelMessage()}
									type="button"
									id="send_channel_message"
								>
									SEND
								</button>
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
			{messages.length ? (
				<div>
					{messages.map((mess) => {
						<span>{mess}</span>;
					})}
				</div>
			) : (
				<div>
					<h1>Empty array</h1>
				</div>
			)}
		</div>
	);
}
