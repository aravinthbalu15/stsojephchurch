import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "../src/languages/english.json";
import tamil from "../src/languages/tamil.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    ta: { translation: tamil },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
