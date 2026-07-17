import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-slate-900/80 border-b border-slate-800 sticky top-0 z-10'>
        {/* Container */}
        <div className='flex items-center justify-between max-w-5xl mx-auto px-4 py-4  '>
            <div className='flex items-center gap-2'>
                <span className='text-white bg-violet-600 h-8 w-8 flex items-center justify-center rounded-lg font-bold'>AI</span>
                <span className='text-white font-semibold text-lg'>Image Generator</span>
            </div>
            <div className='flex items-center gap-6'>
                <a className='text-slate-300 hover:text-white text-sm transition-colors' href="#">Home</a>
                <a className='text-slate-300 hover:text-white text-sm transition-colors' href="#">About</a>
                <a className='px-4 py-1.5 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium text-white text-sm transition-colors' href="#">Login</a>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar