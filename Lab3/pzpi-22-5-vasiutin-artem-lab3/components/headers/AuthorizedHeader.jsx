import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, put } from "../../serverApi";
import "./Header.css";
import LanguagePicker from "../LanguagePicker";
import { useTranslation } from 'react-i18next';

function AuthorizedHeader() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

         const fetchUser = async () => {
             const res = await get("users/current", token);
             if (res.ok) {
                 const data = await res.json();
                 setUser(data.data);
             } else {
                 navigate("/");
             }
        };

        fetchUser();
    }, []);

    const onLogout = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        const res = await put("users/logout", null, token);
        if (res.ok) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <header className="header">
            <h1 className="app-name">{t("Header.appName")}</h1>
            <div className="nav-links">
                <LanguagePicker />
                {user && (
                    <div className="user-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <span className="user-profile">{user.username}     {dropdownOpen ? "▲" : "▼"}</span>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/account">{t("Header.account")}</Link>
                                <Link to="/devices">{t("Header.devices")}</Link>
                                <Link to="/songs">{t("Header.songs")}</Link>
                                <Link to="/effects">{t("Header.effects")}</Link>
                                <button onClick={onLogout}>{t("Header.logout")}</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default AuthorizedHeader;