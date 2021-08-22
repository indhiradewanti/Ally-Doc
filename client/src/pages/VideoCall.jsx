import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import AgoraRTC from "agora-rtc-sdk-ng"; // Install ini aja

let rtc = {
	localAudioTrack: null,
	localVideoTrack: null,
	client: null,
};
const VideoCall = () => {
	const [joined, setJoined] = useState(false);
	const channelRef = useRef("");
	const remoteRef = useRef("");
	const leaveRef = useRef("");
	const inputUserId = useRef(""); // Untuk uid yang unik (boleh masukin ObjectId(User/Doctor))

	let options = {
		appId: "ca2e9fc223264aa59fecda2bbcded5fc",
		channel: "testing", // Untuk channel, harus sama untuk 2 orang bisa dikonek (ObjectId(User) + ObjectId(Doctor))
		token: null,
		uid: inputUserId.current.value,
	};

	async function handleSubmit(e) {
		try {
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
						style: { height: "480px", width: "640px" }, // Untuk ngubah ukuran video client
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

	return (
		<div className="mt-24">
			<div className="container">
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
				<input type="text" ref={inputUserId} className="border" />
			</div>
			{joined ? (
				<>
					<div
						id="local-stream"
						style={{ height: "480px", width: "640px" }} // Untuk ngubah ukuran video sendiri
					></div>
					<div
						id="remote-stream"
						ref={remoteRef}
						style={{ height: "480px", width: "640px" }}
					></div>
				</>
			) : null}
		</div>
	);
};

export default VideoCall;
