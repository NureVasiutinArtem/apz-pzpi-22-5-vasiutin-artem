import React, { useState } from 'react';
import { postForm } from "../../serverApi";
import * as mm from 'music-metadata-browser';
import './Modal.css';
import { useTranslation } from 'react-i18next';

function AddSongModal({ onClose, onSongAdded }) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [duration, setDuration] = useState(0); // milliseconds
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (!selectedFile) return;

        try {
            // Extract metadata for title and artist
            const metadata = await mm.parseBlob(selectedFile);
            const title = metadata.common.title || '';
            const artistName = metadata.common.artist || '';

            setName(title || selectedFile.name.replace(/\.[^/.]+$/, ''));
            setArtist(artistName);
        } catch (err) {
            const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
            setName(baseName);
            setArtist('');
        }

        // Load audio and extract actual duration
        const audio = new Audio();
        audio.src = URL.createObjectURL(selectedFile);
        audio.onloadedmetadata = () => {
            const durationMs = Math.round(audio.duration * 1000);
            setDuration(durationMs);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name || !artist || !duration) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('artist', artist);
        formData.append('duration', duration);

        const res = await postForm("songs/create", formData, token)

        if (res.ok) {
            onSongAdded();
            onClose();
        } else {
            alert(t("AddSongModal.failedCreate"));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("AddSongModal.title")}</h3>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="audio/*" onChange={handleFileChange} required />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("AddSongModal.name")}
                        required
                    />
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder={t("AddSongModal.artist")}
                        required
                    />
                    <input
                        type="text"
                        value={duration ? `${duration} ms` : ''}
                        readOnly
                        placeholder={t("AddSongModal.duration")}
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("AddSongModal.create")}</button>
                        <button type="button" onClick={onClose}>{t("AddSongModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSongModal;