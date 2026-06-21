import { useState, useRef, useEffect, useMemo } from 'react'
import data from '../data.json'
import TreeNode from './TreeNode.jsx'

function getFileType(filename) {
  const parts = filename.split('.')
  const ext = parts.length > 1 ? parts.pop().toUpperCase() : 'Unknown'
  return `${ext} File`
}

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

function nodeMatches(node, query, idsToOpen) {
  const selfMatch = node.name.toLowerCase().includes(query)

  if (node.type === 'file') {
    return selfMatch
  }

  let childMatch = false
  if (node.children) {
    for (const child of node.children) {
      if (nodeMatches(child, query, idsToOpen)) {
        childMatch = true
      }
    }
  }

  if (childMatch) {
    idsToOpen.add(node.id)
  }

  return selfMatch || childMatch
}

function filterTree(nodes, query) {
  if (!query) {
    return { filtered: nodes, idsToOpen: new Set() }
  }

  const lowerQuery = query.toLowerCase()
  const idsToOpen = new Set()
  const filtered = []

  for (const node of nodes) {
    if (nodeMatches(node, lowerQuery, idsToOpen)) {
      filtered.push(node)
    }
  }

  return { filtered, idsToOpen }
}

function App() {
  const [openIds, setOpenIds] = useState(new Set())
  const [selectedFile, setSelectedFile] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const focusRef = useRef(null)

  const { filtered, idsToOpen } = useMemo(() => filterTree(data, searchQuery), [searchQuery])

  const effectiveOpenIds = useMemo(() => {
    if (!searchQuery) return openIds
    const combined = new Set(openIds)
    idsToOpen.forEach((id) => combined.add(id))
    return combined
  }, [openIds, idsToOpen, searchQuery])

  const visibleItems = useMemo(
    () => flattenVisible(filtered, effectiveOpenIds),
    [filtered, effectiveOpenIds]
  )

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
    setFocusedIndex(0)
  }, [searchQuery])

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
      if (current.type === 'folder' && !effectiveOpenIds.has(current.id)) {
        toggleFolder(current.id)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (current.type === 'folder' && effectiveOpenIds.has(current.id)) {
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
        borderRight: '1px solid #232C38',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: '#0B0F14',
            border: '1px solid #232C38',
            borderRadius: '4px',
            color: '#E8EDF2',
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '8px 12px',
            marginBottom: '16px',
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#3DD9D6'}
          onBlur={(e) => e.target.style.borderColor = '#232C38'}
        />

        {visibleItems.length === 0 && searchQuery && (
          <div style={{ color: '#7C8A9A', fontSize: '14px', padding: '8px' }}>
            No results found
          </div>
        )}

        {visibleItems.map((node, index) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={node.depth}
            isOpen={effectiveOpenIds.has(node.id)}
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