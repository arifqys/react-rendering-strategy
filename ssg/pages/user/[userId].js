function UserPosts({ userName, posts }) {
  return (
    <main className='container'>
      <h1 className='title'>Posts from {userName}</h1>

      {posts.map((post, index) => (
        <div key={post.id} className='box'>
          <h2 className='box__title'>{`${index+1}. ${post.title}`}</h2>
          {post.body}
        </div>
      ))}
    </main>
  )
}

// Get a list of paths to be statically generated
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  const paths = users.map(user => ({
    params: {
      userId: String(user.id),
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

// This gets called once at build time
export async function getStaticProps({ params }) { 
  const { userId } = params

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const user = await userResponse.json()

  const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const posts = await postsResponse.json()

  return { 
    props: {
      userName: user.name,
      posts: posts,
    },
  }
}

export default UserPosts
