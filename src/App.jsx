import { useState, useRef, useEffect, useMemo } from 'react'
import data from '../data.json'
import TreeNode from './TreeNode.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import './App.css'

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
    <div onKeyDown={handleKeyDown} className="app">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {visibleItems.length === 0 && searchQuery && (
          <div className="no-results">No results found</div>
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

      <div className="properties-panel">
        <Breadcrumb data={data} selectedFile={selectedFile} />

        <h2 className="properties-title">Properties</h2>

        {selectedFile ? (
          <div>
            <div className="property-group">
              <div className="property-label">Name</div>
              <div className="property-value">{selectedFile.name}</div>
            </div>
            <div className="property-group">
              <div className="property-label">Type</div>
              <div className="property-value">{getFileType(selectedFile.name)}</div>
            </div>
            <div className="property-group">
              <div className="property-label">Size</div>
              <div className="property-value">{selectedFile.size}</div>
            </div>
          </div>
        ) : (
          <p className="properties-empty">Select a file to see its details</p>
        )}
      </div>
    </div>
  )
}

export default App