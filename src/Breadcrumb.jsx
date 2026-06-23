import './Breadcrumb.css'

function findPath(nodes, targetId, path) {
  if (!path) path = []
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i]
    var currentPath = path.concat([node])
    if (node.id === targetId) {
      return currentPath
    }
    if (node.type === 'folder' && node.children) {
      var found = findPath(node.children, targetId, currentPath)
      if (found) return found
    }
  }
  return null
}

function Breadcrumb({ data, selectedFile }) {
  if (!selectedFile) {
    return (
      <div className="breadcrumb">
        <span className="breadcrumb-empty">No file selected</span>
      </div>
    )
  }

  var path = findPath(data, selectedFile.id, [])

  if (!path) return null

  return (
    <div className="breadcrumb">
      {path.map(function(node, index) {
        return (
          <span key={node.id}>
            <span className={index === path.length - 1 ? 'breadcrumb-item active' : 'breadcrumb-item'}>
              {node.name}
            </span>
            {index < path.length - 1 && (
              <span className="breadcrumb-separator"> &gt; </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumb