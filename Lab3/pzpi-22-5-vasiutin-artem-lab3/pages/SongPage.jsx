import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { get, del, put } from "../serverApi";
import Waveform from "../components/Waveform"
import './SongPage.css';
import EditSongModal from '../components/modals/EditSongModal';
import AddTemplateModal from '../components/modals/AddTemplateModal';
import { useTranslation } from 'react-i18next';

function SongPage() {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSong = async () => {
            const res = await get(`songs/${id}`, token);
            if (res.ok) {
                const data = await res.json();
                setSong(data.data);
                const cleanPath = data.data.path?.replace(/^\/+/, "");
                setAudioUrl(`https://localhost:7015/${cleanPath}`);
            }
        };

        const fetchTemplates = async () => {
            const res = await get("templates/for-song", token, { id });
            if (res.ok) {
                const data = await res.json();
                setTemplates(data.data);
            }
        };


        fetchSong();
        fetchTemplates();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm(t("SongPage.confirmDelete"))) {
            const res = await del(`songs/${id}`, token);
            if (res.ok) {
                navigate("/songs");
            } else {
                alert(t("SongPage.failedDelete"));
            }
        }
    };

    const openEditModal = () => {
        setName(song.name);
        setArtist(song.artist);
        setShowEditModal(true);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await put("songs/edit", { id, name, artist }, token);
        if (res.ok) {
            setSong(prev => ({ ...prev, name: name, artist: artist }));
            setShowEditModal(false);
        }
    };

    if (!song) return <div className="song-container">{t("SongPage.loading")}</div>;

    return (
        <>
            <div className="song-container">
                <h2>{song.name}</h2>
                <p><strong>{t("SongPage.artist")}</strong> {song.artist}</p>
                <div>
                    <Waveform url={audioUrl} />
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button onClick={openEditModal}>{t("SongPage.edit")}</button>
                    <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
                        {t("SongPage.delete")}
                    </button>
                </div>

                {showEditModal && (
                    <EditSongModal
                        name={name}
                        artist={artist}
                        onNameChange={(e) => setName(e.target.value)}
                        onArtistChange={(e) => setArtist(e.target.value)}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setShowEditModal(false)}
                    />
                ) }
            </div>
            <div className="templates-section">
                <h3>{t("SongPage.templates")}</h3>
                <button onClick={() => setShowAddTemplateModal(true)}>{t("SongPage.addTemplate")}</button>
                <ul>
                    {templates.map((template) => (
                        <li key={template.id}>
                            <Link to={`/templates/${template.id}`}>
                                <strong>{template.name}</strong>
                            </Link>
                        </li>
                    ))}
                </ul>

                {showAddTemplateModal && (
                    <AddTemplateModal
                        songId={id}
                        onClose={() => setShowAddTemplateModal(false)}
                    />
                ) }
            </div>
        </>
    );
}

export default SongPage;