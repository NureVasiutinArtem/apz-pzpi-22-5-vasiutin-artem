import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { get, put } from "../serverApi";
import EditAccountModal from '../components/modals/EditAccountModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import './AccountPage.css';
import { useTranslation } from 'react-i18next';

function AccountPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [account, setAccount] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            const res = await get("users/current", token);
            if (res.ok) {
                const data = await res.json();
                setAccount(data.data);
            }
        };

        fetchUser();
    }, []);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await put("users/edit", { username, email }, token);
        if (res.ok) {
            setAccount(prev => ({ ...prev, username: username, email: email }));
            setShowEditModal(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const res = await put("users/change-password", { oldPassword, newPassword }, token);
        if (res.ok) {
            setShowPasswordModal(false);
            setErrorMessage('');
        } else {
            const message = await res.text();
            setErrorMessage(message || t('AccountPage.errorMessage'));
        }
    };

    const openEditModal = () => {
        setUsername(account.username);
        setEmail(account.email);
        setShowEditModal(true);
    }

    if (!account) return <div>{t('AccountPage.loading')}</div>;

    return (
        <div className="account-container">
            <h2>{t('AccountPage.title')}</h2>
            <div className="account-info">
                <p><strong>{t('AccountPage.username')}:</strong> {account.username}</p>
                <p><strong>{t('AccountPage.email')}:</strong> {account.email}</p>
                <p><strong>{t('AccountPage.created')}:</strong> {new Date(account.createdAt).toLocaleString()}</p>
            </div>
            <div className="account-actions">
                <button onClick={openEditModal}>{t('AccountPage.edit')}</button>
                <button onClick={() => setShowPasswordModal(true)}>{t('AccountPage.changePassword')}</button>
            </div>

            {showEditModal && (
                <EditAccountModal
                    username={username}
                    email={email}
                    onUsernameChange={(e) => setUsername(e.target.value)}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setShowEditModal(false)}
                />
            )}

            {showPasswordModal && (
                <ChangePasswordModal
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    onOldPasswordChange={(e) => setOldPassword(e.target.value)}
                    onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                    onSubmit={handlePasswordSubmit}
                    onCancel={() => setShowPasswordModal(false)}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    );
}

export default AccountPage;