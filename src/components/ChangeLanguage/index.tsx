import './styles.css';

import React from 'react';

import { languageList } from '../../Context';
import { useLanguageContext } from '../../hook/useLanguageContext';

const ChangeLanguage = () => {
  const { toggleLanguage, selectLanguage } = useLanguageContext();

  return (
    <div className="language__box">
      {languageList.map((lang) => {
        return (
          <p
            className={`language__item ${
              selectLanguage === lang.short && "language__item-active"
            }`}
            onClick={() => toggleLanguage(lang.short)}
          >
            {lang.full}
          </p>
        );
      })}
    </div>
  );
};

export default ChangeLanguage;
