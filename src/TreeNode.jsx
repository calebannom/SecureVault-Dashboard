

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
        padding: '7px 8px',
        paddingLeft: `${8 + depth * 20}px`,
        color: isFolder ? '#E8EDF2' : '#7C8A9A',
        fontFamily: " 'JetBrains Mono' ,monospace" ,
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