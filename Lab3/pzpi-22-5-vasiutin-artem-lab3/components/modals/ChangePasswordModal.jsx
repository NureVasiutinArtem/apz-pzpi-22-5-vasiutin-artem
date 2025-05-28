import { useTranslation } from 'react-i18next';

function ChangePasswordModal({ oldPassword, newPassword, onOldPasswordChange, onNewPasswordChange, onSubmit, onCancel, errorMessage }) {
    const { t } = useTranslation();

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("ChangePasswordModal.title")}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="password"
                        placeholder={t("ChangePasswordModal.oldPassword")}
                        value={oldPassword}
                        onChange={onOldPasswordChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t("ChangePasswordModal.newPassword")}
                        value={newPassword}
                        onChange={onNewPasswordChange}
                        required
                    />
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <div className="modal-buttons">
                        <button type="submit">{t("ChangePasswordModal.change")}</button>
                        <button type="button" onClick={onCancel}>{t("ChangePasswordModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordModal;