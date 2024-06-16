import axios from "axios";
import Link from "next/link";
import Main from "./contents/forums/main/page";
async function getBlogs() {
  const response = await axios.get(
    "https://6664041f932baf9032a9ab94.mockapi.io/blog"
  );
  return response.data;
}

export default async function Page() {
  const blogs = await getBlogs();
  return (
    <div>
      <div class="flex flex-row px-5 gap-8">

        {/*Menu Forums*/}
        <div class="basis-4/5 -5">

          <div class="mb-8">
          <h3 class="text-xl bg-slate-300 p-2">Forums</h3>

          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead className="bg-slate-400">
                <tr className="text-white">
                  <th>Forums Name</th>
                  <th>Lasted</th>
                </tr>
              </thead>

              <tbody className="bg-slate-100">
                {/* row 1 */}
                <tr>
                  <td>
                    <Link className="hover:text-blue-600" href="/contents/forums/news" >                    
                    <p>News</p>
                    <p>ประกาศจากทีมงาน</p>                   
                    </Link>
                  </td>
                  <td>Quality Control Specialist</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>
                    <Link className="hover:text-blue-600" href="/contents/forums/main">
                      <p>Main Forum</p>
                      <p>พูดคุยสบาย ๆ</p>
                    </Link>
                  </td>
                  <td>Desktop Support Technician</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <td>
                    <Link className="hover:text-blue-600" href="/contents/forums/sport">
                      <p>Sport</p>
                      <p>ทุกเรื่อง, สารพัดกีฬา</p>
                    </Link>
                  </td>
                  <td>Tax Accountant</td>
                </tr>


                {/* row 4 */}
                <tr>
                  <td>
                    <Link className="hover:text-blue-600" href="/contents/forums/movies">
                      <p>Movies</p>
                      <p>หนังที่ชื่นชอบ, เรื่องที่โปรดปราน</p>
                    </Link>
                  </td>
                  <td>Tax Accountant</td>
                </tr>


                {/* row 5 */}
                <tr>
                  <td>
                    <Link className="hover:text-blue-600" href="/contents/forums/music">
                      <p>Music</p>
                      <p>ดนตรี, เพลง (ห้ามโพสต์ Link Download เพลง)</p>
                    </Link>
                  </td>
                  <td>Tax Accountant</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>



          <div class="mb-8">
          <h3 class="text-xl bg-slate-300 p-2">All About Lightning</h3>

          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead className="bg-slate-400">
                <tr className="text-white">
                  <th>Forums Name</th>
                  <th>Lasted</th>
                </tr>
              </thead>

              <tbody className="bg-slate-100">
                {/* row 1 */}
                <tr>
                  <td>
                    <div>
                      <p>Market Place</p>
                      <p>ตลาดนัดขายของ</p>
                    </div>
                  </td>
                  <td>Quality Control Specialist</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>
                    <div>
                      <p>Lightning Network</p>
                      <p>ปัญหาการใช้งานทั่วไป</p>
                    </div>
                  </td>
                  <td>Desktop Support Technician</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <td>
                    <div>
                      <p>Node Runner</p>
                      <p>การรันโหนด</p>
                    </div>
                  </td>
                  <td>Tax Accountant</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>

        <div class="basis-1/5">
          <p class="text-xl bg-slate-300 p-2 text-center	">Hot Zap</p>
          <div className="bg-slate-100">
          {blogs.map((blog, index) => (
        <div className="" key={index}>
          <Link href={`/blog/${blog.id}`}>
            <div class="p-2 border-b-2 border-indigo-100">        
              <p>{blog.title}</p>    
              
              <p>กระทู้โดย : {blog.name}</p>
            </div>
          </Link>
        </div>
      ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}
