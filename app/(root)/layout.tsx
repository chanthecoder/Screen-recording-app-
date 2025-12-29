import React from 'react'
import Navbar from '@/components/Navbar'

// the children is the property of the prop , the prop comes from between the layout tags and the children have a type react node
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default layout
