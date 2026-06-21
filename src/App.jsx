
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


import data from '../data.json'
import TreeNode from './TreeNode.jsx'

function App() {
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
          <TreeNode key={node.id} node={node} />
        ))}
      </div>

      <div style={{ flex: 1, padding: '24px', color: '#7C8A9A' }}>
        <p>Select a file to see its details</p>
      </div>
    </div>
  )
}

export default App