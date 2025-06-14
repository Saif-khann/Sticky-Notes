import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import { Analytics } from "@vercel/analytics/react"

function App() {
  // State for notes and search query
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNote, setEditingNote] = useState(null)

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  // Add a new note
  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setNotes([...notes, newNote])
  }

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    if (editingNote && editingNote.id === id) {
      setEditingNote(null)
    }
  }

  // Edit a note
  const startEditingNote = (note) => {
    setEditingNote(note)
  }

  // Update a note
  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ))
    setEditingNote(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingNote(null)
  }

  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Note</h2>
            <NoteForm 
              onSubmit={editingNote ? updateNote : addNote} 
              initialNote={editingNote}
              isEditing={!!editingNote}
              onCancel={cancelEdit}
            />
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Notes</h2>
            <SearchBar onSearch={setSearchQuery} />
            
            <div className="mt-6">
              <NoteList 
                notes={filteredNotes} 
                onDelete={deleteNote} 
                onEdit={startEditingNote} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App