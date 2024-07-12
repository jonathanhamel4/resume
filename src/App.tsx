import { useMemo } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Layout } from "./components/layout/layout";

import en from "./assets/i18n/en.json";
import fr from "./assets/i18n/fr.json";
import "font-awesome/css/font-awesome.min.css";

const languages = ["en", "fr"] as const;

function App({ locale }: { locale?: "en" | "fr" }) {
  const browserLanguage =
    languages.find((lang) => lang === navigator.language) ?? "en";
  const finalLocale = locale || browserLanguage;

  useMemo(() => {
    i18n.use(initReactI18next).init({
      resources: {
        en: {
          translation: en,
        },
        fr: {
          translation: fr,
        },
      },
      lng: finalLocale,
      fallbackLng: "en",

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout />;
}

export default App;
