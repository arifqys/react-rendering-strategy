import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'

function UserPosts() {
  const [posts, setPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [name, setName] = useState('')
  const { userId } = useParams()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(data => data.json())
      .then(data => setName(data.name))

    setIsLoadingPosts(true)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(data => data.json())
      .then(data => setPosts(data))
      .finally(() => setIsLoadingPosts(false))
  }, [userId]);

  return (
    <main className='container'>
      <h1 className='title'>Posts from {name}</h1>

      {posts.map((post, index) => (
        <div key={post.id} className='box'>
          <h2 className='box__title'>{`${index+1}. ${post.title}`}</h2>
          <p>{post.body}</p>
        </div>
      ))}

      {isLoadingPosts && <p>Loading posts...</p>}
    </main>
  )
}

export default UserPosts
