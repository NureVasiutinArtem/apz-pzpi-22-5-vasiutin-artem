import React, { useEffect, useState } from "react";
import { get, del } from "../serverApi";
import "./SongsListPage.css";
import CreateEffectModal from "../components/modals/CreateEffectModal";
import EditEffectModal from "../components/modals/EditEffectModal";
import { useTranslation } from 'react-i18next';

function EffectsListPage() {
    const [effects, setEffects] = useState([]);
    const [showCreateEffectModal, setShowCreateEffectModal] = useState(false);
    const [chosenEffectId, setChosenEffectId] = useState(0);
    const [showEditEffectModal, setShowEditEffectModal] = useState(false);
    const token = localStorage.getItem("token");

    const { t } = useTranslation();


    const fetchEffects = async () => {
        const res = await get("effects/all", token);
        if (res.ok) {
            const data = await res.json();
            setEffects(data.data);
        }
    };

    const handleNewEffectCreated = async () => {
        fetchEffects();
        setShowCreateEffectModal(false);
    };

    const handleEditEffect = async (id) => {
        setChosenEffectId(id);
        setShowEditEffectModal(true);
    }

    const handleEffectChanged = async () => {
        fetchEffects();
        setShowEditEffectModal(false);
    }

    const handleDelete = async (id, name) => {
        if (window.confirm(t('EffectsListPage.confirmDelete') + ` ${name}?`)) {
            const res = await del(`effects/${id}`, token);
            if (res.ok) {
                fetchEffects();
            } else {
                alert(t('EffectsListPage.failedDelete'));
            }
        }
    };

    useEffect(() => {
        fetchEffects();
    }, []);

    return (
        <div className="songs-page">
            <h2>{t('EffectsListPage.effects')}</h2>
            <button onClick={() => setShowCreateEffectModal(true)}>{t('EffectsListPage.addEffect')}</button>
            <ul>
                {effects.map((effect) => (
                    <li key={effect.id}>
                        <div className="option-button">
                            <div>
                                <strong>{effect.name}</strong> - {effect.type == 1 ? t('EffectsListPage.steady')
                                    : effect.type == 2 ? t('EffectsListPage.blinking') : t('EffectsListPage.wave') }; {effect.color}
                            </div>
                            <div className="buttons-container">
                                <button
                                    type="button"
                                    onClick={() => handleEditEffect(effect.id)}>
                                    {t('EffectsListPage.edit')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(effect.id, effect.name)}>
                                    {t('EffectsListPage.del')}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {showCreateEffectModal && (
                <CreateEffectModal
                    onCreate={handleNewEffectCreated}
                    onClose={() => setShowCreateEffectModal(false)}
                />
            )}

            {showEditEffectModal && (
                <EditEffectModal
                    id={chosenEffectId}
                    onEdit={handleEffectChanged}
                    onClose={() => setShowEditEffectModal(false)}
                />
            )}
        </div>
    );
}

export default EffectsListPage;