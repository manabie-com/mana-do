import { useContext } from 'react';

import { LanguageContext } from '../Context';

export function useLanguageContext() {
  return useContext(LanguageContext);
}
