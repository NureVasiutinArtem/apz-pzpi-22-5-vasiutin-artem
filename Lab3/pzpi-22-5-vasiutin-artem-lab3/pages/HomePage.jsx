import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function HomePage() {
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

  return (
      <div style={{ padding: 20 }}>
          <h2>{t('HomePage.welcome')}</h2>
      </div>
  );
}

export default HomePage;