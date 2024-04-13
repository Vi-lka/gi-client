import 'server-only'

export interface DictionariesType {
  ru: () => Promise<Dictionary>;
  en: () => Promise<Dictionary>;
}

const dictionaries = {
  ru: () =>
    import("../static/dictionaries/ru.json").then(
      (module) => module.default,
    ),
  en: () =>
    import("../static/dictionaries/en.json").then(
      (module) => module.default,
    ),
} as DictionariesType;

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof DictionariesType]();