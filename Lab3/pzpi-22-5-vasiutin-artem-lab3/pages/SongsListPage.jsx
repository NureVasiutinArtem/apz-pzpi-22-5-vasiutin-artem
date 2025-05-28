import React, { useEffect, useState } from "react";
import AddSongModal from "../components/modals/AddSongModal";
import { Link } from 'react-router-dom';
import { get } from "../serverApi";
import "./SongsListPage.css";
import { useTranslation } from 'react-i18next';

function SongsListPage() {
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    useEffect(() => {
        const fetchSongs = async () => {
            const res = await get("songs/all", token);
            if (res.ok) {
                const data = await res.json();
                setSongs(data.data);
            }
        };
        fetchSongs();
    }, []);

    return (
        <div className="songs-page">
            <h2>{t("SongsListPage.songs")}</h2>
            <button onClick={() => setShowModal(true)}>{t("SongsListPage.addSong")}</button>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <Link to={`/songs/${song.id}`}>
                            <strong>{song.name}</strong> {t("SongsListPage.by")} {song.artist}
                        </Link>
                    </li>
                ))}
            </ul>
            {showModal && (
                <AddSongModal
                    onClose={() => setShowModal(false)}
                    onSongAdded={() => window.location.reload()}
                />
            )}
        </div>
    );
}

export default SongsListPage;