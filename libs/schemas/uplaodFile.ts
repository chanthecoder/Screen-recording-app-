

// purpose of this file is to define the shapes and rule for the API and formdata when submitting to the database 
// this acts as a source of truth when trying to update the database schema so that only one change is needed to share across frontend and backend 
// it is a validation schema

// 2 differnt types of input to validate for the upload including an fileinput and formfield

// Zod is best for data that looks like plain JSON: strings, numbers, booleans, objects, arrays, enums, etc.
// Your video and thumbnail are:
// File objects in the browser
// Sent over the network as multipart/form-data
// Read on the backend from FormData
// That’s a bit different from “normal” JSON. Because of that, most people:
// Use Zod for the text fields (title, description, visibility, etc.)
// Use simple checks (if/else, size, type) for the File objects, both in frontend and backend
//Zod schema for your text fields / metadata. Regular JS checks for your file inputs on both frontend and backend.


import { z } from 'zod'  

export const uploadVideoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is a required field")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description is at most 500 characters")
    .optional()
    .or(z.literal('')),
  visibility: z.enum(['public', 'private'] as const, {
    message: 'Visibility must be public or private',
  }),
})

export type UploadVideoInput = z.infer<typeof uploadVideoSchema>;