import { Navigate, Route, Routes } from 'react-router-dom';
import UserList from '../screens/users/user-list/UserList.tsx';
import UserRepositories from '../screens/users/user-repositories/UserRepositories.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:userId/repos" element={<UserRepositories />} />
    </Routes>
  );
};

export default AppRoutes;