import { Routes, Route, Navigate } from 'react-router-dom';
import Users from "../screens/users/users.tsx";
// import UserRepositories from "./screens/users/UserRepositories.tsx"; // Uncomment when you have this component

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<Users />} />
            {/*<Route path="/users/:userId/repositories" element={<UserRepositories />} />*/}
        </Routes>
    );
};

export default AppRoutes;