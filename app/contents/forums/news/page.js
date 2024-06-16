import Link from "next/link";

export default function Page() {
  return (
    <div>
        {/*Breadcrumb*/}
      <div className="text-sm breadcrumbs mx-4 mb-4">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Forums</a>
          </li>
          
        </ul>
      </div>
      <div class="mb-8">
        <h3 class="text-xl bg-slate-300 p-2">News</h3>

        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead className="bg-slate-400">
              <tr className="text-white">
                <th>Topics</th>
                <th>Last Post By</th>
              </tr>
            </thead>

            <tbody className="bg-slate-100">
              {/* row 1 */}
              <tr>
                <td>
                  <Link href="/contents/forums/news">
                    <p>News</p>
                    <p>ประกาศจากทีมงาน1</p>
                  </Link>
                </td>
                <td>Quality Control Specialist</td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>
                  <div>
                    <p>Update v.2</p>
                    <p>ประกาศจากทีมงาน2</p>
                  </div>
                </td>
                <td>Desktop Support Technician</td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>
                  <div>
                    <p>Sport</p>
                    <p>ทุกเรื่อง, สารพัดกีฬา</p>
                  </div>
                </td>
                <td>Tax Accountant</td>
              </tr>

              {/* row 4 */}
              <tr>
                <td>
                  <div>
                    <p>Movies</p>
                    <p>หนังที่ชื่นชอบ, เรื่องที่โปรดปราน</p>
                  </div>
                </td>
                <td>Tax Accountant</td>
              </tr>

              {/* row 5 */}
              <tr>
                <td>
                  <div>
                    <p>Music</p>
                    <p>ดนตรี, เพลง (ห้ามโพสต์ Link Download เพลง)</p>
                  </div>
                </td>
                <td>Tax Accountant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
