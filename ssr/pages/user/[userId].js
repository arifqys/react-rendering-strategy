function UserPosts({ userName, posts }) {
  return (
    <div className='container'>
      <h1 className='title'>Posts from {userName}</h1>

      {posts.map((post, index) => (
        <div key={post.id} className='box'>
          <h2 className='box__title'>{`${index+1}. ${post.title}`}</h2>
          {post.body}
        </div>
      ))}
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  const { userId } = params

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const user = await userResponse.json()

  if (!user) {
    return {
      notFound: true,
    }
  }

  const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const posts = await postsResponse.json()

  return { 
    props: {
      userName: user.name,
      posts,
    }
  }
}

export default UserPosts
