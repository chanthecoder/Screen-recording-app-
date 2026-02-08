'use client'

import FormField from "@/components/FormField"
import FileInput from "@/components/FileInput"
import { ChangeEvent, useState } from "react"


const page = () => {
    const [FormData,setFormData]= useState({
        title: "",
        visibility: "public",
        description: "",
    })
    const video = {}
    const thumbnail={}
    const [error,setError] = useState(null)
    const handleInputChange= (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        // we first get what is currently in the field 
        // we get the name and the current value typed into that specific field 
        // then we update it base on the latest thing that the user has typed in to ensure it is the most updated version
        const {name,value} = e.target
        setFormData((prevState)=>({...prevState, [name]:value}))


    }
    return (
        <div className="wrapper page">
            <h1>Upload a Video</h1>
            {error && <div className="error-field">{error}</div>}
            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
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
                <FileInput id="video" label="Video" accept="video/*" file={video.file} previewUrl={video.previewUrl} inputRef={video.inputRef} onChange={video.onChange} onReset={video.onReset} />
                <FileInput id="thumbnail" label="Thumbnail" accept="image/*" file={thumbnail.file} previewUrl={thumbnail.previewUrl} inputRef={thumbnail.inputRef} onChange={thumbnail.onChange} onReset={thumbnail.onReset} />
                <Formthumbnail
                    id ="visibility" 
                    label ="Visibility"
                    value= {FormData.visibility}
                    as="select"
                    options={[{value: "public", label: "Public"},{value: "private", label: "Private"}]}
                    onChange={handleInputChange}
                    placeholder="Enter a description of the video"
                />
            </form>
        </div>
    )
}

export default page
