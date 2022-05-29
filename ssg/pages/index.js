import Link from 'next/link'

function App({ users }) {
  return (
    <main className='container'>
      <h1 className='title'>Users</h1>

      {users.map(user => (
        <div key={user.id} className='box'>
          <h3 className='box__title'>{user.name}</h3>
          <p>{user.email}</p>
          <Link href={`/user/${user.id}`}>
            <a className='box__link'>See {user.name} Posts</a>
          </Link>
        </div>
      ))}
    </main>
  )
}

// This gets called once at build time
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  return {
    props: {
      users: users,
    },
  }
}

export default App
