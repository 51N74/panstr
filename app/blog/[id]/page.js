import axios from "axios";

async function getBlog(id){
    const response = await axios.get(`https://6664041f932baf9032a9ab94.mockapi.io/blog/${id}`)
    return response.data
  }

export default  async function Page({params}) {
    const blog = await getBlog(params.id)
    return (
        <>
            <h1>Title: {blog.title}</h1>
            <p> Body: {blog.content}</p>
            <p>Author: {blog.name}</p>
        </>
    );
}