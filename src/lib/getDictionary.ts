"use server"

import { localesCodes } from '@/static/locales';

export interface DictionariesType {
  ru: () => Promise<Dictionary>;
  en: () => Promise<Dictionary>;
}

const dictionaries: DictionariesType = {
  ru: () =>
    import("../static/dictionaries/ru.json").then(
      (module) => module.default,
    ),
  en: () =>
    import("../static/dictionaries/en.json").then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: string) => {
  const key = localesCodes.includes(locale) 
    ? locale as keyof DictionariesType 
    : "en" as keyof DictionariesType

  const dictionary = dictionaries[key];

  return dictionary();
}