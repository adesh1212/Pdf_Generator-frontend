import React from 'react'

function Loader() {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="grid gap-2">
                <div className="flex items-center justify-center space-x-2 animate-pulse">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
            </div>

        </div>
    )
}

export default Loader