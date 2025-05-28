import React, { useEffect, useState } from "react";
import { get } from "../serverApi";
import { useTranslation } from 'react-i18next';

function AdminUsersPage() {
    const [users, setUsers] = useState([]);

    const { t } = useTranslation();

    const fetchUsers = async () => {
        const res = await get("users/all");
        if (res.ok) {
            const data = await res.json();
            setUsers(data.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="songs-page">
            <h2>{t('AdminUsersPage.title')}</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <a href="#">
                            <strong>{user.username}</strong> - {user.since}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUsersPage;