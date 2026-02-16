'use client'

import FormField from "@/components/FormField"
import FileInput from "@/components/FileInput"
import { ChangeEvent, FormEvent, useState } from "react"
import { useFileInput } from "@/libs/hooks/useFileInput"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants"


const page = () => {
    const[isSubmitting,setisSubmitting]= useState(false)

    const [FormData,setFormData]= useState({
        title: "",
        visibility: "public",
        description: "",
    })

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail= useFileInput(MAX_THUMBNAIL_SIZE)
    const [error,setError] = useState('')

    const handleInputChange= (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        // we first get what is currently in the field 
        // we get the name and the current value typed into that specific field 
        // then we update it base on the latest thing that the user has typed in to ensure it is the most updated version
        const {name,value} = e.target
        setFormData((prevState)=>({...prevState, [name]:value}))
    }

    const handleSubmitForm = (e:FormEvent)=>{
        e.preventDefault();
        setisSubmitting(true);

        try{
            


        }catch(error){

        }finally{
            setisSubmitting(false)
        }
        // we need to do a few things 
        // 1. we need to first get the form data which in this case is in the useFileInput, useFileOutput and form data
        // 2. we need to validate all these data is actually aligned with the database schema that is being defined in the database , we are using postgress
        // 3. we call out api enpoint that handles the uploadn 

    }
    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a Video</h1>
            {error && <div className="error-field">{error}</div>}
            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmitForm}>
                <FormField
                    id ="title" 
                    label ="Title"
                    value= {FormData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concise video"
                />
                <FormField
                    id ="description" 
                    label ="Description"
                    value= {FormData.description}
                    as="textarea"
                    onChange={handleInputChange}
                    placeholder="Enter a description of the video"
                />
                <FileInput id="video" label="Video" accept="video/*" file={video.file} previewUrl={video.previewUrl} inputRef={video.inputRef} onChange={video.handleFileChange} onReset={video.resetFile} type="video" />
                <FileInput id="thumbnail" label="Thumbnail" accept="image/*" file={thumbnail.file} previewUrl={thumbnail.previewUrl} inputRef={thumbnail.inputRef} onChange={thumbnail.handleFileChange} onReset={thumbnail.resetFile} type="image" />
                <FormField
                    id ="visibility" 
                    label ="Visibility"
                    value= {FormData.visibility}
                    as="select"
                    options={[{value: "public", label: "Public"},{value: "private", label: "Private"}]}
                    onChange={handleInputChange}
                    placeholder="Enter a description of the video"
                />

                <button type="submit" disabled={isSubmitting} className="submit-button" >
                    {isSubmitting?"uploading...":"upload video"}
                </button>
            </form>
        </div>
    )
}

export default page

