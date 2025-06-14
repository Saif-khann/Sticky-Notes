import { useState, useEffect } from 'react'

const NoteForm = ({ onSubmit, initialNote = null, isEditing = false, onCancel }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  // Set form values when editing a note
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title)
      setContent(initialNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [initialNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!content.trim()) {
      setError('Content is required')
      return
    }
    
    // Clear error if validation passes
    setError('')
    
    // Submit the note
    const noteData = { title, content }
    if (isEditing && initialNote) {
      noteData.id = initialNote.id
      noteData.createdAt = initialNote.createdAt
    }
    
    onSubmit(noteData)
    
    // Reset form if not editing
    if (!isEditing) {
      setTitle('')
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Enter Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Note title..."
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Enter Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary min-h-[120px]"
          placeholder="Note content..."
        />
      </div>
      
      <div className="flex space-x-3">
        <button 
          type="submit" 
          className="btn bg-primary text-white"
        >
          {isEditing ? 'Update Note' : 'Add Note'}
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn bg-gray-200 text-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default NoteForm