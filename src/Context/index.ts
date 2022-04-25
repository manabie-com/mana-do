import { createContext } from 'react';

import { dataLanguage } from '../language';

export const defaultLanguage = "vi";
export const languageList: {
  short: keyof typeof dataLanguage;
  full: string;
}[] = [
  { short: "vi", full: "VietNam" },
  { short: "en", full: "English" },
  { short: "jp", full: "Japan" },
];

export const defaultContext: {
  selectLanguage: keyof typeof dataLanguage;
  dataLanguage: typeof dataLanguage;
  toggleLanguage: (lang: keyof typeof dataLanguage) => void;
} = {
  selectLanguage: defaultLanguage,
  dataLanguage,
  toggleLanguage: () => {},
};
export const LanguageContext = createContext(defaultContext);
