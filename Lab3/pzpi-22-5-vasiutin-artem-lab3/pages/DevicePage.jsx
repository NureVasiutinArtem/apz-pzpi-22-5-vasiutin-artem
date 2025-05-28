import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { get, put, del } from "../serverApi";
import Waveform from "../components/Waveform";
import EditDeviceModal from "../components/modals/EditDeviceModal";
import { useNavigate } from "react-router-dom";
import './SongPage.css';
import { useTranslation } from 'react-i18next';

function DevicePage() {
    const { id } = useParams(); // device id
    const [device, setDevice] = useState(null);
    const [songs, setSongs] = useState(null);
    const [song, setSong] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [templates, setTemplates] = useState(null);
    const [template, setTemplate] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [type, setType] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const { t } = useTranslation();

    const fetchSong = async (songId) => {
        const res = await get(`songs/${songId}`, token);
        if (res.ok) {
            const data = await res.json();
            setSong(data.data);
            const cleanPath = data.data.path?.replace(/^\/+/, "");
            setAudioUrl(`https://localhost:7015/${cleanPath}`);
        }
    };

    useEffect(() => {
        const fetchSongs = async () => {
            const res = await get("songs/all", token);
            if (res.ok) {
                const data = await res.json();
                setSongs(data.data);
            }
        };

        const fetchDevice = async () => {
            const res = await get(`devices/${id}`, token);
            if (res.ok) {
                const data = await res.json();
                setDevice(data.data);
            }
        };
        
        fetchDevice();
        fetchSongs();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm(t("DevicePage.confirmDelete"))) {
            const res = await del(`devices/${id}`, token);
            if (res.ok) {
                navigate(`/devices`);
            } else {
                alert(t("DevicePage.failedDelete"));
            }
        }
    };

    const openEditModal = () => {
        setName(device.name);
        setType(device.type);
        setShowEditModal(true);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await put("devices/edit", { id, name, type }, token);
        if (res.ok) {
            setDevice(prev => ({ ...prev, name: name, type: type }));
            setShowEditModal(false);
        }
    };

    const handleSongPlay = async (songId) => {
        const res1 = await get(`songs/${songId}`, token);
        if (res1.ok) {
            const data = await res1.json();
            setSong(data.data);
            const cleanPath = data.data.path?.replace(/^\/+/, "");
            setAudioUrl(`https://localhost:7015/${cleanPath}`);
        }

        const res2 = await get("templates/for-song", token, { id: songId });
        if (res2.ok) {
            const data = await res2.json();
            setTemplates(data.data);
        }
    }

    const handleChoseTemplate = async (templateId) => {
        const res = await get(`templates/${templateId}`, token);
        if (res.ok) {
            const data = await res.json();
            setTemplate(data.data);
            fetchSong(data.data.songId);
        }
    }

    const turnOff = async () => {
        const res = await put(`devices/turn-off/${id}`, null, token);
        if (res.ok) {
            setDevice(prev => ({ ...prev, isOn: false }));
        }
    }

    const turnOn = async () => {
        const res = await put(`devices/turn-on/${id}`, null, token);
        if (res.ok) {
            setDevice(prev => ({ ...prev, isOn: true }));
        }
    }

    if (!device) return <div className="template-container">{t("DevicePage.loading")}</div>;

    return (
        <>
            <div className="song-container">
                <h2>{device.name}</h2>
                <h3>{device.type}</h3>
                <h4>{t("DevicePage.lastOnline")}: {device.lastOnline ?? t("DevicePage.unknown")}</h4>
                <h4>{t("DevicePage.currently")}: {device.isOn ? t("DevicePage.on") : t("DevicePage.off")}</h4>
                <div style={{ marginTop: "20px" }}>
                    <button onClick={openEditModal}>{t("DevicePage.edit")}</button>
                    {device.isOn ? (
                        <button onClick={turnOff} style={{ marginLeft: "10px", color: "red" }}>
                            {t("DevicePage.turnOff")}
                        </button>
                    ) : (
                        <button onClick={turnOn} style={{ marginLeft: "10px", color: "green" }}>
                            {t("DevicePage.turnOn")}
                        </button>
                    )}
                    <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
                        {t("DevicePage.delete")}
                    </button>
                </div>

                {showEditModal && (
                    <EditDeviceModal
                        name={name}
                        type = {type}
                        onNameChange={(e) => setName(e.target.value)}
                        onTypeChange={(e) => setType(e.target.value)}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setShowEditModal(false)}
                    />
                )}
            </div>
            <div className="device-page-layout">
                <div className="templates-section left-pane">
                    <h3 style={{ marginTop: "30px" }}>{t("DevicePage.songs")}</h3>
                    <ul>
                        {songs?.map((song) => (
                            <li key={song.id} className="option-button">
                                <div>
                                    <strong>{song.name}</strong> {t("DevicePage.by")} {song.artist}
                                </div>
                                <button onClick={() => handleSongPlay(song.id)}>{t("DevicePage.play")}</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {song && (
                    <div className="song-display right-pane">
                        <h2>{song.name}</h2>
                        <div>
                            <Waveform url={audioUrl} />
                        </div>
                        {template && <h3>{t("DevicePage.template")}: {template.name}</h3>}

                        {templates && (
                            <div className="templates-section">
                                <h3>{t("DevicePage.templates")}</h3>
                                <ul>
                                    {templates?.map((t) => (
                                        <li key={t.id} className="option-button">
                                            <button onClick={() => handleChoseTemplate(t.id)}>
                                                <strong>{t.name}</strong>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default DevicePage;