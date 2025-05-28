import React, { useState } from 'react';
import { post } from "../../serverApi";
import { useNavigate } from "react-router-dom";
import './Modal.css';
import { useTranslation } from 'react-i18next';

function AddTemplateModal({ songId, onClose }) {
    const [name, setName] = useState('');
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !name ) return;

        const res = await post("templates/create", { songId, name }, token)

        if (res.ok) {
            const data = await res.json();
            navigate(`/templates/${data.data}`);
        } else {
            const message = await res.text();
            setError(message || t("AddTemplateModal.defaultError"));
        } 
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("AddTemplateModal.title")}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("AddTemplateModal.name")}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("AddTemplateModal.creatge")}</button>
                        <button type="button" onClick={onClose}>{t("AddTemplateModal.cancel")}</button>
                    </div>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

export default AddTemplateModal;