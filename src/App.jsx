
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


import { useState } from 'react'
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

export default App