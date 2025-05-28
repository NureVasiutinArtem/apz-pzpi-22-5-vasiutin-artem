import React from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next';

function EditAccountModal({ username, email, onUsernameChange,
    onEmailChange, onSubmit, onCancel }) {
    const { t } = useTranslation();

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("EditAccountModal.title")}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder={t("EditAccountModal.username")}
                        value={username}
                        onChange={onUsernameChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder={t("EditAccountModal.email")}
                        value={email}
                        onChange={onEmailChange}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("EditAccountModal.save")}</button>
                        <button type="button" onClick={onCancel}>{t("EditAccountModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAccountModal;