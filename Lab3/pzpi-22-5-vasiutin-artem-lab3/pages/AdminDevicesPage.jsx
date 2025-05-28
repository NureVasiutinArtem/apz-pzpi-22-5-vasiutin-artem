import React, { useEffect, useState } from "react";
import { get } from "../serverApi";
import "./SongsListPage.css";
import { useTranslation } from 'react-i18next';

function AdminDevicesPage() {
    const [devices, setDevices] = useState([]);

    const { t } = useTranslation();

    const fetchDevices = async () => {
        const res = await get("devices/all-admin");
        if (res.ok) {
            const data = await res.json();
            setDevices(data.data);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div className="songs-page">
            <h2>{t('DeviceListPage.devices')}</h2>
            <ul>
                {devices.map((device) => (
                    <li key={device.id}>
                        <a>
                            <strong>{device.name}</strong> ({device.type})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDevicesPage;