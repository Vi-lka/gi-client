"use client"


import { atom } from "jotai";

export const dateAtom = atom<Date | undefined>(undefined);
export const monthAtom = atom<Date | undefined>(undefined);
export const eventIdAtom = atom("0");