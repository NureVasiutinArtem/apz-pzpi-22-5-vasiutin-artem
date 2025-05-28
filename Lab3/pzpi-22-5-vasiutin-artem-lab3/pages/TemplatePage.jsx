import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { get, put, del } from "../serverApi";
import Waveform from "../components/Waveform";
import AddEffectModal from "../components/modals/AddEffectModal";
import EditTemplateModal from "../components/modals/EditTemplateModal";
import { useNavigate } from "react-router-dom";
import './SongPage.css';
import { useTranslation } from 'react-i18next';

function TemplatePage() {
    const { id } = useParams(); // template id
    const [template, setTemplate] = useState(null);
    const [song, setSong] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [effects, setEffects] = useState([]);
    const [showAddEffectModal, setShowAddEffectModal] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const waveformRef = useRef();

    const [name, setName] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    const { t } = useTranslation();

    const fetchEffects = async () => {
        const res = await get(`effects/for-template`, token, { templateId: id });
        if (res.ok) {
            const data = await res.json();
            setEffects(data.data);
        }
    };

    useEffect(() => {
        const fetchSong = async (songId) => {
            const res = await get(`songs/${songId}`, token);
            if (res.ok) {
                const data = await res.json();
                setSong(data.data);
                const cleanPath = data.data.path?.replace(/^\/+/, "");
                setAudioUrl(`https://localhost:7015/${cleanPath}`);
            }
        };

        const fetchTemplate = async () => {
            const res = await get(`templates/${id}`, token);
            if (res.ok) {
                const data = await res.json();
                setTemplate(data.data);
                fetchSong(data.data.songId);
            }
        };

        fetchTemplate();
        fetchEffects();
    }, [id, token]);

    const handleEffectAdded = () => {
        fetchEffects();
        setShowAddEffectModal(false);
    };

    const handleDelete = async () => {
        if (window.confirm(t("TemplatePage.confirmDelete"))) {
            const res = await del(`templates/${id}`, token);
            if (res.ok) {
                navigate(`/songs/${template.songId}`);
            } else {
                alert(t("TemplatePage.failedDelete"));
            }
        }
    };

    const openEditModal = () => {
        setName(template.name);
        setShowEditModal(true);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await put("templates/edit", { id, name }, token);
        if (res.ok) {
            setTemplate(prev => ({ ...prev, name: name }));
            setShowEditModal(false);
        }
    };

    const handleEffectDelete = async (id) => {
        const res = await del(`effects/remove-from-template/${id}`, token);
        if (res.ok) {
            fetchEffects();
        } else {
            alert(t("TemplatePage.failedRemove"));
        }
    }

    if (!template || !song || !audioUrl) return <div className="template-container">{t("TemplatePage.loading")}</div>;

    return (
        <>
            <div className="song-container">
                <h2>{template.name}</h2>
                <h3>{song.name}</h3>

                <div>
                    <Waveform
                        ref={waveformRef}
                        url={audioUrl}
                    />
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button onClick={openEditModal}>{t("TemplatePage.rename")}</button>
                    <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
                        {t("TemplatePage.delete")}
                    </button>
                </div>

                {showEditModal && (
                    <EditTemplateModal
                        name={name}
                        onNameChange={(e) => setName(e.target.value)}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setShowEditModal(false)}
                    />
                )}
            </div>
            <div className="templates-section">
                <h3 style={{ marginTop: "30px" }}>{t("TemplatePage.effects")}</h3>
                <button onClick={() => setShowAddEffectModal(true)} style={{ marginTop: "20px" }}>
                    {t("TemplatePage.addEffect")}
                </button>
                <ul>
                    {effects.map((effect) => (
                        <li key={effect.id} className="option-button">
                            <div>
                                <strong>{effect.name}</strong> {t("TemplatePage.at")} {Math.round(effect.timeStamp)}{t("TemplatePage.ms")} {t("TemplatePage.for")} {effect.duration}{t("TemplatePage.ms")}
                            </div>
                            <button onClick={() => handleEffectDelete(effect.id)}>Del</button>
                        </li>
                    ))}
                </ul>


                {showAddEffectModal && (
                    <AddEffectModal
                        templateId={id}
                        timestampMs={waveformRef.current?.getCurrentTime()}
                        onClose={() => setShowAddEffectModal(false)}
                        onEffectAdded={handleEffectAdded}
                    />
                )}
            </div>
        </>

    );
}

export default TemplatePage;