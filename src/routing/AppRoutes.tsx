import { Navigate, Route, Routes } from 'react-router-dom';
import UserList from '../screens/users/user-list/user-list.tsx';
import UserRepositories from '../screens/users/user-repositories/user-repositories.tsx';

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