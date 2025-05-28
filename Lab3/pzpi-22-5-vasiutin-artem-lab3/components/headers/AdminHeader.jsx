import { Link } from "react-router-dom";
import "./Header.css";
import LanguagePicker from "../LanguagePicker";
import { useTranslation } from 'react-i18next';

function AdminHeader() {
    const { t } = useTranslation();

    return (
        <header className="header">
            <h1 className="app-name">{t("Header.appName")} | ADMIN</h1>
            <div className="nav-links">
                <LanguagePicker />
                <Link to="/admin/users">{t("Header.admin-users")}</Link>
                <Link to="/admin/devices">{t("Header.devices")}</Link>
            </div>
        </header>
    );
}

export default AdminHeader;