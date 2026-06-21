
//function App() {
  //return (
    //<div style={{ color: 'white', background: '#0B0F14', minHeight: '100vh', padding: '24px', fontFamily: 'monospace' }}>
      //<h1>SecureVault is loading...</h1>
    //</div>
  //)
//}

//export default App

//import data from '../data.json'

//function App() {
  //return (
    //<div style={{ color: 'white', background: '#0B0F14', minHeight: '100vh', padding: '24px', fontFamily: 'monospace' }}>
      //<h1>SecureVault Explorer</h1>
      //<pre>{JSON.stringify(data, null, 2)}</pre>
    //</div>
  //)
//}

//export default App


//import data from '../data.json'
//import TreeNode from './TreeNode.jsx'

//function App() {
  //return (
    //<div style={{
      //display: 'flex',
      //minHeight: '100vh',
      //background: '#0B0F14',
      //fontFamily: 'monospace'
    //}}>
      //<div style={{
        //width: '320px',
        //background: '#121821',
        //padding: '16px',
        //borderRight: '1px solid #232C38'
      //}}>
        //{data.map((node) => (
          //<TreeNode key={node.id} node={node} />
        //))}
      //</div>

      //<div style={{ flex: 1, padding: '24px', color: '#7C8A9A' }}>
        //<p>Select a file to see its details</p>
      //</div>
 //   </div>
  //)
//}

//export default App


/*import { useState } from 'react'
import data from '../data.json'
import TreeNode from './TreeNode.jsx'

function getFileType(filename) {
  const parts = filename.split('.')
  const ext = parts.length > 1 ? parts.pop().toUpperCase() : 'Unknown'
  return `${ext} File`
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0B0F14',
      fontFamily: 'monospace'
    }}>
      <div style={{
        width: '320px',
        background: '#121821',
        padding: '16px',
        borderRight: '1px solid #232C38'
      }}>
        {data.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedId={selectedFile?.id}
            onSelectFile={setSelectedFile}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '24px', color: '#7C8A9A' }}>
        <h2 style={{ color: '#E8EDF2', fontSize: '16px', fontWeight: 500 }}>Properties</h2>

        {selectedFile ? (
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Name</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{selectedFile.name}</div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Type</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{getFileType(selectedFile.name)}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Size</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{selectedFile.size}</div>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: '16px' }}>Select a file to see its details</p>
        )}
      </div>
    </div>
  )
}

export default App  */


import { useState, useRef, useEffect, useMemo } from 'react'
import data from '../data.json'
import TreeNode from './TreeNode.jsx'

function getFileType(filename) {
  const parts = filename.split('.')
  const ext = parts.length > 1 ? parts.pop().toUpperCase() : 'Unknown'
  return `${ext} File`
}

// Flattens the tree into a list of currently VISIBLE items only,
// respecting which folders are open/closed.
function flattenVisible(nodes, openIds, depth = 0) {
  let result = []
  for (const node of nodes) {
    result.push({ ...node, depth })
    if (node.type === 'folder' && openIds.has(node.id) && node.children) {
      result = result.concat(flattenVisible(node.children, openIds, depth + 1))
    }
  }
  return result
}

function App() {
  const [openIds, setOpenIds] = useState(new Set())
  const [selectedFile, setSelectedFile] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const focusRef = useRef(null)
  const containerRef = useRef(null)

  const visibleItems = useMemo(() => flattenVisible(data, openIds), [openIds])

  const toggleFolder = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (e) => {
    const current = visibleItems[focusedIndex]
    if (!current) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((i) => Math.min(i + 1, visibleItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (current.type === 'folder' && !openIds.has(current.id)) {
        toggleFolder(current.id)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (current.type === 'folder' && openIds.has(current.id)) {
        toggleFolder(current.id)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (current.type === 'file') {
        setSelectedFile(current)
      } else {
        toggleFolder(current.id)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0B0F14',
        fontFamily: 'monospace'
      }}
    >
      <div style={{
        width: '320px',
        background: '#121821',
        padding: '16px',
        borderRight: '1px solid #232C38'
      }}>
        {visibleItems.map((node, index) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={node.depth}
            isOpen={openIds.has(node.id)}
            isSelected={node.id === selectedFile?.id}
            isFocused={index === focusedIndex}
            onToggle={toggleFolder}
            onSelectFile={setSelectedFile}
            focusRef={focusRef}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '24px', color: '#7C8A9A' }}>
        <h2 style={{ color: '#E8EDF2', fontSize: '16px', fontWeight: 500 }}>Properties</h2>

        {selectedFile ? (
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Name</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{selectedFile.name}</div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Type</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{getFileType(selectedFile.name)}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#7C8A9A' }}>Size</div>
              <div style={{ fontSize: '14px', color: '#E8EDF2', marginTop: '4px' }}>{selectedFile.size}</div>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: '16px' }}>Select a file to see its details</p>
        )}
      </div>
    </div>
  )
}

export default App