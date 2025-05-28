import React, { useState } from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next';

function EditSongModal({ name, artist, onNameChange,
    onArtistChange, onSubmit, onCancel }) {
    const { t } = useTranslation();

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{t("EditSongModal.title")}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder={t("EditSongModal.name")}
                        required
                    />
                    <input
                        type="text"
                        value={artist}
                        onChange={onArtistChange}
                        placeholder={t("EditSongModal.artist")}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">{t("EditSongModal.save")}</button>
                        <button type="button" onClick={onCancel}>{t("EditSongModal.cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSongModal;