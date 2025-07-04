import React, { useState } from 'react';
import { StickyNote, Save, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; title: string; content: string; date: Date }>>([]);

  const saveNote = () => {
    if (!notes.trim()) return;
    
    const newNote = {
      id: Date.now().toString(),
      title: notes.split('\n')[0].slice(0, 50) + '...',
      content: notes,
      date: new Date(),
    };
    
    setSavedNotes(prev => [newNote, ...prev]);
    setNotes('');
  };

  const exportNotes = () => {
    const content = savedNotes.map(note => 
      `${note.title}\n${note.date.toLocaleDateString()}\n${'-'.repeat(50)}\n${note.content}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl w-full max-w-4xl h-[600px] flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Note Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center space-x-3">
                <StickyNote className="h-6 w-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notes</h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveNote}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={exportNotes}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2"
                >
                  ×
                </button>
              </div>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your calculation notes here..."
              className="flex-1 p-6 border-none outline-none resize-none bg-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* Saved Notes */}
          <div className="w-80 border-l border-gray-200 dark:border-dark-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Saved Notes</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                  onClick={() => setNotes(note.content)}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {note.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {note.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
              {savedNotes.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                  No saved notes yet
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notepad;