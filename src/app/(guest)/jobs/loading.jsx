import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:col-span-3 h-[calc(100vh-300px)]">
      <h1 className="text-xl font-medium flex items-center gap-4">
        <Loader className="animate-spin" /> Loading...
      </h1>
    </div>
  )
}

export default Loading