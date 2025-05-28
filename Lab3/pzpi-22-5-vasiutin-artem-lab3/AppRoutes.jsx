import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AuthorizedHeader from "./components/headers/AuthorizedHeader";
import UnauthorizedHeader from "./components/headers/UnauthorizedHeader";
import { Routes, Route, useLocation } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import SongsListPage from "./pages/SongsListPage";
import SongPage from "./pages/SongPage";
import TemplatePage from "./pages/TemplatePage";
import EffectsListPage from "./pages/EffectsListPage";
import DevicesListPage from "./pages/DevicesListPage";
import DevicePage from "./pages/DevicePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminDevicesPage from "./pages/AdminDevicesPage";
import AdminHeader from "./components/headers/AdminHeader";

function AppRoutes() {
    const location = useLocation();
    const isAdminPage = ["/admin/users", "/admin/devices"].includes(location.pathname);
    const isAuthPage = ["/login", "/register", ].includes(location.pathname);

    return (
        <>
            {isAdminPage ? <AdminHeader/> : isAuthPage ? <UnauthorizedHeader /> : <AuthorizedHeader />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/songs" element={<SongsListPage />} />
                <Route path="/songs/:id" element={<SongPage />} />
                <Route path="/templates/:id" element={<TemplatePage /> } />
                <Route path="/effects" element={<EffectsListPage />} />
                <Route path="/devices" element={<DevicesListPage />} />
                <Route path="/devices/:id" element={<DevicePage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/devices" element={<AdminDevicesPage />} />
            </Routes>
        </>
    );
}

export default AppRoutes;