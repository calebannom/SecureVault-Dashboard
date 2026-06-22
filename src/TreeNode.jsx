import { useState } from 'react'

function TreeNode({ node, depth, isOpen, isSelected, isFocused, onToggle, onSelectFile, focusRef }) {
  const [isHovered, setIsHovered] = useState(false)
  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id)
    } else {
      onSelectFile(node)
    }
  }

  const getBackground = () => {
    if (isSelected) return '#1F4D4C'
    if (isHovered) return '#1A222D'
    return 'transparent'
  }

  return (
    <div
      ref={isFocused ? focusRef : null}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={-1}
      style={{
        cursor: 'pointer',
        padding: '7px 8px',
        paddingLeft: `${8 + depth * 20}px`,
        color: isFolder ? '#E8EDF2' : '#7C8A9A',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        background: getBackground(),
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