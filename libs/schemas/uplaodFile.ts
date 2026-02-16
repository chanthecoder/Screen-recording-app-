import z from 'zod'

// purpose of this file is to define the shapes and rule for the API and formdata when submitting to the database 
// this acts as a source of truth when trying to update the database schema so that only one change is needed to share across frontend and backend 
// it is a validation schema