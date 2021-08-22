import React, { useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

let rtc = {
	localAudioTrack: null,
	client: null,
};

const Call = () => {
	const inputUserId = useRef("");

	let options = {
		appId: "ca2e9fc223264aa59fecda2bbcded5fc",
		channel: "testing",
		token: null,
		uid: inputUserId.current.value,
	};

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
		rtc.localAudioTrack.close();
		await rtc.client.leave();
	};

	startBasicCall();

	return (
		<div className="row mt-24">
			<div>
				<button onClick={() => joinHandler()} type="button" id="join">
					JOIN
				</button>
				<button onClick={() => leaveHandler()} type="button" id="leave">
					LEAVE
				</button>
				<input type="text" ref={inputUserId} />
			</div>
		</div>
	);
};

export default Call;
