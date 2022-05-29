import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {
  const [users, setUsers] = useState([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  useEffect(() => {
    setIsLoadingUsers(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => data.json())
      .then(data => setUsers(data))
      .finally(() => setIsLoadingUsers(false))
  }, [])

  return (
    <main className='container'>
      <h1 className='title'>Users</h1>

      {users.map(user => (
        <div key={user.id} className='box'>
          <h3 className='box__title'>{user.name}</h3>
          <p>{user.email}</p>
          <Link to={`/user/${user.id}`} className='box__link'>
            See {user.name} Posts
          </Link>
        </div>
      ))}

      {isLoadingUsers && <p>Loading users...</p>}
    </main>
  )
}

export default Home
