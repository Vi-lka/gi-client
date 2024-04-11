import type ru from "./src/static/dictionaries/ru.json";
 
type Messages = typeof ru;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface Dictionary {}
}