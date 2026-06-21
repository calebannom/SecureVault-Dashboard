import { useState } from 'react'

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

export default TreeNode