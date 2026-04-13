import { useState } from 'react'
import Usercount from './components/Usercount'
import Users from './components/Users'

function App() {
  const [userCount, setUserCount] = useState(0)

  const handleAddUser = () => {
    setUserCount(prev => prev + 1)
  }

  return (
    <div className="App">
      <Usercount count={userCount} />
      <Users onAddUser={handleAddUser} />
    </div>
  )
}

export default App
