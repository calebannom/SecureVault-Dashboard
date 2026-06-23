import './TreeNode.css'

function TreeNode({ node, depth, isOpen, isSelected, isFocused, onToggle, onSelectFile, focusRef }) {
  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id)
    } else {
      onSelectFile(node)
    }
  }

  const classNames = [
    'tree-node',
    isFolder ? 'is-folder' : '',
    isSelected ? 'is-selected' : '',
    isFocused ? 'is-focused' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={isFocused ? focusRef : null}
      onClick={handleClick}
      tabIndex={-1}
      className={classNames}
      style={{ paddingLeft: '${8 + depth * 20}px' }}
    >
      {isFolder ? (isOpen ? '▾ ' : '▸ ') : '  '}
      {node.name}
    </div>
  )
}

export default TreeNode