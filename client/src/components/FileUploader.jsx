import React, {useRef} from 'react'

const FileUploader = ({onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
  // handle validations
      const file = e.target.files[0];
      onFileSelectSuccess(file) 
    }

    return (
        <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon mb-1">Upload Photo</label>
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
            <div class="flex flex-col items-center justify-center pt-7">
              <svg class="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p class="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider" onClick={e => fileInput.current && fileInput.current.click()}>Select a photo</p>
            </div>
            <input type="file" class="hidden" accept="image/png, image/jpeg"  onChange={handleFileInput}/>
          </label>
        </div>
      </div>
        // <div className="file-uploader">
        //     <input type="file" onChange={handleFileInput}/>
        //     <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"> </button>
        // </div>
    )
}

export default FileUploader
