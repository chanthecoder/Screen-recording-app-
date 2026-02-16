import { ChangeEvent,useRef,useState } from "react"


// deals only with the file upload logic

// the function should handle several things 
// 1. handle the file selection, 2. create the preview url, 3, validate file size, 4. Reser or clear the file for reupload,
export const useFileInput = (maxSize:number) => {

    const [file,setFile] = useState<File | null>(null)
    const [previewUrl,setPreviewUrl] = useState<string | null>('')
    const [duration,setDuration] = useState<number | null>(0)
    const inputRef = useRef<HTMLInputElement>(null)

    // useRef does not cause a component to rerender when there is a change in the componenet 
    // when we put inside an input tag ref = useRef , we can access the dom of the input tag directly and manipulate it 



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]){
            const selectedFile = e.target.files?.[0]

            // fist we need to check the size , if it is too big we cannot accept it 
            if (selectedFile.size>maxSize) return;

            // then we fetch the preview url by using the url.createObjectURL, but before that we need to first clear the previous preview url
            if(previewUrl) URL.revokeObjectURL(previewUrl);
            const newPreviewUrl= URL.createObjectURL(selectedFile)
            setPreviewUrl(newPreviewUrl)
            setFile(selectedFile)

            // we get the duration of the video if the uplaoded item is a video 

            if (selectedFile.type.startsWith('video/')){
                // since the raw selected video do not contain the duratrion of the video , we need to create a video tag to parse this 
                const video = document.createElement('video')
                // tell the browser onlu load the metadata but not the full video to save bandwith for faster response 
                video.preload = 'metadata'
                video.src = newPreviewUrl

                video.onloadedmetadata=()=>{
                    if (isFinite(video.duration)&&video.duration>0){
                        setDuration(Math.round(video.duration))
                    }else{
                        setDuration(0)
                    }
                    URL.revokeObjectURL(video.src)
                }

            }


        }
    }
    // first check whether there is currently a file being selected if there is set it back to null 
    // also we clear out the preview url to free up memory to avoid memory leaks 
    const resetFile= ()=>{
        // if we were to reset the file , 1. we need to make sure we clear the pointer that is pointing to the local url in our file space
        if(previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null)
        setDuration(0)
        setPreviewUrl(null)

        if (inputRef.current) inputRef.current.value=""


            
    }

    return {file,previewUrl,duration,inputRef,handleFileChange,resetFile}


}

