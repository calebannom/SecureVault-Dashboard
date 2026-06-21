/*import { useState } from 'react'

function TreeNode({ node }) {
  const [isOpen, setIsOpen] = useState(false)

  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          color: isFolder ? '#E8EDF2' : '#7C8A9A',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
      >
        {isFolder ? (isOpen ? '▾ ' : '▸ ') : '  '}
        {node.name}
      </div>

      {isFolder && isOpen && (
        <div style={{ paddingLeft: '20px' }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode    */

/*import { useState } from 'react'

function TreeNode({ node, selectedId, onSelectFile }) {
  const [isOpen, setIsOpen] = useState(false)

  const isFolder = node.type === 'folder'
  const isSelected = node.id === selectedId

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen)
    } else {
      onSelectFile(node)
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          color: isFolder ? '#E8EDF2' : '#7C8A9A',
          fontFamily: 'monospace',
          fontSize: '14px',
          background: isSelected ? '#1F4D4C' : 'transparent',
          borderLeft: isSelected ? '2px solid #3DD9D6' : '2px solid transparent',
        }}
      >
        {isFolder ? (isOpen ? '▾ ' : '▸ ') : '  '}
        {node.name}
      </div>

      {isFolder && isOpen && (
        <div style={{ paddingLeft: '20px' }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode  */


function TreeNode({ node, depth, isOpen, isSelected, isFocused, onToggle, onSelectFile, focusRef }) {
  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id)
    } else {
      onSelectFile(node)
    }
  }

  return (
    <div
      ref={isFocused ? focusRef : null}
      onClick={handleClick}
      tabIndex={-1}
      style={{
        cursor: 'pointer',
        padding: '4px 8px',
        paddingLeft: `${8 + depth * 20}px`,
        color: isFolder ? '#E8EDF2' : '#7C8A9A',
        fontFamily: 'monospace',
        fontSize: '14px',
        background: isSelected ? '#1F4D4C' : 'transparent',
        borderLeft: isSelected ? '2px solid #3DD9D6' : '2px solid transparent',
        outline: isFocused ? '1px solid #3DD9D6' : 'none',
      }}
    >
      {isFolder ? (isOpen ? '▾ ' : '▸ ') : '  '}
      {node.name}
    </div>
  )
}

export default TreeNode