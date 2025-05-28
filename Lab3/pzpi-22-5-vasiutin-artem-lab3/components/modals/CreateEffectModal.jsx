import React, { useState } from "react";
import { post } from "../../serverApi";
import "./Modal.css";
import { useTranslation } from 'react-i18next';

function CreateEffectModal({ onClose, onCreate }) {
    const [name, setName] = useState("");
    const [type, setType] = useState(1);
    const [color, setColor] = useState("");
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name || !color) return;

        const res = await post("effects/create", { name, type: parseInt(type), color }, token);

        if (res.ok) {
            onCreate();
        } else {
            alert(t("CreateEffectModal.failedCreate"));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("CreateEffectModal.title")}</h3>

                <form onSubmit={handleCreate}>
                    <label>{t("CreateEffectModal.name")}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <label>{t("CreateEffectModal.type")}</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value={1}>{t("CreateEffectModal.steady")}</option>
                        <option value={2}>{t("CreateEffectModal.blinking")}</option>
                        <option value={3}>{t("CreateEffectModal.wave")}</option>
                </select>

                    <label>{t("CreateEffectModal.color")}</label>
                <input value={color} onChange={(e) => setColor(e.target.value)} />

                    <div className="modal-buttons">
                        <button type="submit">{t("CreateEffectModal.create")}</button>
                        <button type="button" onClick={onClose}>{t("CreateEffectModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default CreateEffectModal;