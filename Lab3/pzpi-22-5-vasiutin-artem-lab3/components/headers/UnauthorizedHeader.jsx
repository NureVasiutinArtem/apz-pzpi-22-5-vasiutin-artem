import { Link } from "react-router-dom";
import "./Header.css";
import LanguagePicker from "../LanguagePicker";
import { useTranslation } from 'react-i18next';

function UnauthorizedHeader() {
    const { t } = useTranslation();

    return (
        <header className="header">
            <h1 className="app-name">{t("Header.appName")}</h1>
            <div className="nav-links">
                <LanguagePicker />
                <Link to="/login">{t("Header.login")}</Link>
                <Link to="/register">{t("Header.register")}</Link>
            </div>
        </header>
    );
}

export default UnauthorizedHeader;