// pages/admin.js
import { withAuthorization } from '../middleware/auth';

function Admin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <a href="/api/auth/logout">Logout</a>
      <p>Manage Threads and Users</p>
    </div>
  );
}

export default withAuthorization(Admin, ['Admin']);
