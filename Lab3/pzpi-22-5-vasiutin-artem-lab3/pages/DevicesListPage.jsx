import React, { useEffect, useState } from "react";
import AddDeviceModal from "../components/modals/AddDeviceModal";
import { Link } from 'react-router-dom';
import { get } from "../serverApi";
import "./SongsListPage.css";
import { useTranslation } from 'react-i18next';

function DevicesListPage() {
    const [devices, setDevices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const fetchDevices = async () => {
        const res = await get("devices/all", token);
        if (res.ok) {
            const data = await res.json();
            setDevices(data.data);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleDeviceCreated = () => {
        fetchDevices();
        setShowModal(false);
    }

    return (
        <div className="songs-page">
            <h2>{t('DeviceListPage.devices')}</h2>
            <button onClick={() => setShowModal(true)}>{t('DeviceListPage.registerDevice')}</button>
            <ul>
                {devices.map((device) => (
                    <li key={device.id}>
                        <Link to={`/devices/${device.id}`}>
                            <strong>{device.name}</strong> ({device.type})
                        </Link>
                    </li>
                ))}
            </ul>
            {showModal && (
                <AddDeviceModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleDeviceCreated}
                />
            )}
        </div>
    );
}

export default DevicesListPage;