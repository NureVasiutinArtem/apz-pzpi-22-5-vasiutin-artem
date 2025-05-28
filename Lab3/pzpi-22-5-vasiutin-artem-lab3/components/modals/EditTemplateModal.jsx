import './Modal.css';
import { useTranslation } from 'react-i18next';

function EditTemplateModal({ name, onNameChange, onSubmit, onCancel }) {
    const { t } = useTranslation();

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("EditTemplateModal.title")}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder={t("EditTemplateModal.name")}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("EditTemplateModal.save")}</button>
                        <button type="button" onClick={onCancel}>{t("EditTemplateModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTemplateModal;