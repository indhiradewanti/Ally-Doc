import React, { useRef } from "react";

const FileUploader = ({ onFileSelectSuccess, file }) => {
	const fileInput = useRef(null);

	const handleFileInput = (e) => {
		// handle validations
		const file = e.target.files[0];
		onFileSelectSuccess(file);
	};

	return (
		<div className="grid grid-cols-1 mt-5 mx-7">
			<label className="text-lg text-gray-500 text-light caslon mb-1">
				{!file ? (
					"Upload Photo"
				) : (
					<span className="text-purple-500">
						Photo has been uploaded
					</span>
				)}
			</label>
			<div className="flex items-center justify-center w-full">
				<label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
					<div className="flex flex-col items-center justify-center pt-7">
						<svg
							className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						<p
							className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider"
							onClick={(e) =>
								fileInput.current && fileInput.current.click()
							}
						>
							{!file ? "Select a photo" : `${file.name}`}
						</p>
					</div>
					<input
						type="file"
						className="hidden"
						accept="image/png, image/jpeg"
						onChange={handleFileInput}
					/>
				</label>
			</div>
		</div>
	);
};

export default FileUploader;
