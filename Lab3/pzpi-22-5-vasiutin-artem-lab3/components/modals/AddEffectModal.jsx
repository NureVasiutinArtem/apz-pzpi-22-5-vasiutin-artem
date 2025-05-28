import React, { useEffect, useState } from "react";
import CreateEffectModal from "./CreateEffectModal";
import { get, post } from "../../serverApi";
import "./Modal.css";
import { useTranslation } from 'react-i18next';


function AddEffectModal({ templateId, timestampMs, onClose, onEffectAdded }) {
    const [effects, setEffects] = useState([]);
    const [selectedEffectId, setSelectedEffectId] = useState(null);
    const [timestamp, setTimestamp] = useState(timestampMs);
    const [duration, setDuration] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const fetchEffects = async () => {
        const res = await get("effects/all", token);
        if (res.ok) {
            const data = await res.json();
            setEffects(data.data);
        }
    };

    useEffect(() => {
        fetchEffects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEffectId) {
            alert(t("AddEffectModal.selectEffectError"));
            return;
        }

        const res = await post("effects/add-to-template", {
            templateId,
            effectId: selectedEffectId,
            timestampMs: parseInt(timestamp),
            duration
        }, token);

        if (res.ok) {
            onEffectAdded();
        } else {
            alert(t("AddEffectModal.failedCreate"));
        }
    };

    const handleEffectClick = (effectId) => {
        setSelectedEffectId(effectId);
    };

    const handleNewEffectCreated = async () => {
        fetchEffects();
        setShowCreateModal(false);
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <h3>{t("AddEffectModal.title")}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label><strong>{t("AddEffectModal.selectEffect")}</strong></label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
                                {effects.map(effect => (
                                    <button
                                        type="button"
                                        key={effect.id}
                                        onClick={() => handleEffectClick(effect.id)}
                                        style={{
                                            padding: "6px 12px",
                                            backgroundColor: effect.id === selectedEffectId ? "#3b82f6" : "#e5e7eb",
                                            color: effect.id === selectedEffectId ? "#fff" : "#000",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {effect.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>{t("AddEffectModal.timestamp")}</label>
                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => setTimestamp(e.target.value)}
                                style={{ width: "100%", padding: "6px", marginTop: "5px" }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>{t("AddEffectModal.duration")}</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                style={{ width: "100%", padding: "6px", marginTop: "5px" }}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button type="submit">{t("AddEffectModal.add")}</button>
                            <button type="button" onClick={() => setShowCreateModal(true)}>
                                {t("AddEffectModal.create")}
                            </button>
                            <button type="button" onClick={onClose}>{t("AddEffectModal.cancel")}</button>
                        </div>
                    </form>
                </div>
            </div>

            {showCreateModal && (
                <CreateEffectModal
                    onCreate={handleNewEffectCreated}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </>
    );
}

export default AddEffectModal;