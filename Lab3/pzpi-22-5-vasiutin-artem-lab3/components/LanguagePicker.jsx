import { useState, useEffect } from 'react';
import i18n from 'i18next'; // or from wherever you're importing it

export default function LanguagePicker() {
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang).then(() => {
            setLanguage(newLang);
        });
    };

    return (
        <select onChange={handleLanguageChange} value={language}>
            <option value="en">English</option>
            <option value="uk">Українська</option>
        </select>
    );
}