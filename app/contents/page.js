async function getDatas() {
    const res = await fetch('https://6664041f932baf9032a9ab94.mockapi.io/blog')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Page() {
    const blogs =  await getDatas()
    return (
        <div>
            Content Page
            
            {
                blogs.map((blog,index) => (
                    <div key={index}>
                        {blog.id}
                        {blog.title}
                        {blog.name}
                    </div>
                ))
            }
        </div>
    );
}