import React, { useState } from "react";
import { post } from "../../serverApi";
import "./Modal.css";
import { useTranslation } from 'react-i18next';

function AddDeviceModal({ onClose, onCreate }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name || !type) return;

        const res = await post("devices/create", { name, type }, token);

        if (res.ok) {
            onCreate();
        } else {
            alert(t("AddDeviceModal.failedCreate"));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("AddDeviceModal.title")}</h3>

                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("AddDeviceModal.deviceName")}
                        required
                    />
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder={t("AddDeviceModal.deviceType")}
                    />

                    <div className="modal-buttons">
                        <button type="submit">{t("AddDeviceModal.register")}</button>
                        <button type="button" onClick={onClose}>{t("AddDeviceModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default AddDeviceModal;