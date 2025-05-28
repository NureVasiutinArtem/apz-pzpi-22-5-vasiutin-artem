import React, { useState } from 'react';
import { post } from "../serverApi";
import { useNavigate } from "react-router-dom";
import './AuthPages.css';
import { useTranslation } from 'react-i18next';

function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await post("users/register", form);
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.data);
            navigate("/home");
        } else {
            const message = await res.text();
            setError(message || t('RegisterPage.errorDefault'));
        }
    };

    return (
        <div className="auth-container">
            <h2>{t('RegisterPage.title')}</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder={t('RegisterPage.username')} onChange={handleChange} required />
                <input name="email" type="email" placeholder={t('RegisterPage.email')} onChange={handleChange} required />
                <input name="password" type="password" placeholder={t('RegisterPage.password')} onChange={handleChange} required />
                <input name="passwordRepeat" type="password" placeholder={t('RegisterPage.repeatPassword')} onChange={handleChange} required />
                <button type="submit">{t('RegisterPage.registerAction')}</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default RegisterPage;