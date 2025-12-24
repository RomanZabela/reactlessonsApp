import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import commonEN from "./locales/en/common.json";
import productEN from "./locales/en/product.json";
import aboutEN from "./locales/en/about.json";
import homeEn from "./locales/en/home.json";

import commonHE from "./locales/he/common.json";
import productHE from "./locales/he/product.json";
import aboutHE from "./locales/he/about.json";
import homeHE from "./locales/he/home.json";

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: commonEN,
                product: productEN,
                about: aboutEN,
                home: homeEn,
            },
            he: {
                common: commonHE,
                product: productHE,
                about: aboutHE,
                home: homeHE,
            },
        },
        fallbackLng: "en",
        ns: ["common", "product"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;