"use server"

import { getEnv, withErrorHandling,apiFetch } from "../utils"
// it will be used as a server action 

import { BUNNY } from "@/constants"

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID")
// the below access keys would need to be included in headers for both streaming and storage when making the api call to bunny
const ACCESS_KEYS= {
    streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey : getEnv("BUNNY_STORAGE_ACCESS_KEY")
}



// server action

export const getVideoUploadUrl = withErrorHandling(async ()=>{
    //  we allocate and set up the video object first in bunny cdn 
    const videoResponse = await apiFetch(`${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,{
        method: "POST",
        bunnyType:"stream",
        body:{
            title: "Video Upload Draft",
            collectionId:" "
        }
    })
    // after we grab the video response , we can have it into guid and the video url 
    const uploadUrl= `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`

    return {
        videoID: videoResponse.guid,
        uploadUrl,
        accessKey: ACCESS_KEYS.streamAccessKey
    } 
}
)

// server action
export const getThumbnailUploadUrl = withErrorHandling(async(videoID)=>{

    const fileName= `${Date.now()}-${videoID}-thumbnail`

    // this is the upload URL where the backend calls the bunny server for upload  
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`
    // this cdn url is for the end user to user so they can access the content from the edge 
    const cdnUrl= `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`

    return {
        uploadUrl,
        cdnUrl,
        accessKey:ACCESS_KEYS.storageAccessKey
    }

})


export const saveVideoDetails= withErrorHandling()




