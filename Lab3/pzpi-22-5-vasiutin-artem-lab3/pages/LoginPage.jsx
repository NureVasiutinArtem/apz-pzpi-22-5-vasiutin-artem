import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { post } from "../serverApi";
import './AuthPages.css';
import { useTranslation } from 'react-i18next';

function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        const res = await post("users/login", form);
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.data);
            navigate("/home");
        } else {
            const message = await res.text();
            setError(message || t('LoginPage.errorDefault'));
        }
    };

    return (
        <div className="auth-container">
            <h2>{t('LoginPage.login')}</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{t('LoginPage.loginAction')}</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoginPage;