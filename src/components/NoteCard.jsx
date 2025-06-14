import React from 'react'

const NoteCard = ({ note, onDelete, onEdit }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Generate a random pastel color for the note
  const getRandomColor = () => {
    const colors = [
      'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 
      'bg-indigo-100', 'bg-purple-100', 'bg-pink-100',
      'bg-red-100', 'bg-orange-100'
    ]
    // Use the note id to consistently get the same color for the same note
    const colorIndex = note.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[colorIndex]
  }

  return (
    <div className={`rounded-md p-4 shadow-sm ${getRandomColor()}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800 break-words">{note.title}</h3>
        {note.createdAt && (
          <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
        )}
      </div>
      
      <p className="text-gray-700 mb-4 break-words whitespace-pre-wrap">{note.content}</p>
      
      <div className="flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(note)}
          className="btn-secondary text-sm px-3 py-1 rounded-md bg-secondary text-white"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(note.id)}
          className="btn-danger text-sm px-3 py-1 rounded-md bg-danger text-white"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard