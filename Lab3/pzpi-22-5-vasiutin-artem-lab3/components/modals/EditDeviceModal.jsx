import './Modal.css';
import { useTranslation } from 'react-i18next';

function EditDeviceModal({ name, type, onNameChange, onTypeChange, onSubmit, onCancel }) {
    const { t } = useTranslation();

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("EditDeviceModal.title")}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder={t("EditDeviceModal.deviceName")}
                        required
                    />
                    <input
                        type="text"
                        value={type}
                        onChange={onTypeChange}
                        placeholder={t("EditDeviceModal.deviceType")}
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("EditDeviceModal.save")}</button>
                        <button type="button" onClick={onCancel}>{t("EditDeviceModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditDeviceModal;