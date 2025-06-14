import React from 'react'

const Header = () => {
  return (
    <header className="bg-primary text-white rounded-md shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.25V16.5C21 18.9853 18.9853 21 16.5 21H7.5C5.01472 21 3 18.9853 3 16.5V7.5C3 5.01472 5.01472 3 7.5 3H12.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 3.75V8.25C16.5 9.49264 17.5074 10.5 18.75 10.5H21.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12.75H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.75 15.75H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-2xl md:text-3xl font-bold">Sticky Notes</h1>
        </div>
        <div>
          <p className="text-sm md:text-base">Keep your thoughts organized</p>
        </div>
      </div>
    </header>
  )
}

export default Header