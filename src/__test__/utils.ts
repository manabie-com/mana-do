import { MANADO_DB } from "../constants";
import { IManaDo_DB } from "../utils/localDatabase";

export function fetchDB(): IManaDo_DB {
  return JSON.parse(localStorage.getItem(MANADO_DB) || "");
}