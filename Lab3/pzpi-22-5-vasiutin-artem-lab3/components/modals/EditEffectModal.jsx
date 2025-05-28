import React, { useState, useEffect } from "react";
import { get, put } from "../../serverApi";
import "./Modal.css"
import { useTranslation } from 'react-i18next';

function EditEffectModal({ id, onClose, onEdit }) {
    const [effect, setEffect] = useState({
        id: id,
        name: '',
        type: 1,
        color: '',
    });
    const { t } = useTranslation();

    useEffect(() => {
        const fetchEffect = async () => {
            const res = await get(`effects/${id}`);
            if (res.ok) {
                const data = await res.json();
                setEffect(data.data);
            }
        };

        fetchEffect();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEffect(prev => ({
            ...prev,
            [name]: name === "type" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await put("effects/edit", effect);
        if (res.ok) {
            onEdit();
        } else {
            alert(t("EditEffectModal.failedEdit"));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("EditEffectModal.title")}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder={t("EditEffectModal.name")}
                        value={effect.name}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label>{t("EditEffectModal.type")}</label>
                        <select
                            name="type"
                            value={effect.type}
                            onChange={handleChange}
                        >
                            <option value={1}>{t("EditEffectModal.steady")}</option>
                            <option value={2}>{t("EditEffectModal.blinking")}</option>
                            <option value={3}>{t("EditEffectModal.wave")}</option>
                        </select>
                    </div>
                
                    <input
                        name="color"
                        placeholder={t("EditEffectModal.color")}
                        value={effect.color}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">
                        <button type="submit">{t("EditEffectModal.save")}</button>
                        <button type="button" onClick={onClose}>{t("EditEffectModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditEffectModal;