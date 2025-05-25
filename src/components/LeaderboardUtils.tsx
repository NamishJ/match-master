import React from "react";
import type { LeaderboardEntry } from "../assets/utils";

const LOCAL_KEY = 'local-leaderboard';

export const getLocalLeaderboard = (): LeaderboardEntry[] => {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const saveToLocalLeaderboard = (entry: LeaderboardEntry) => {
    const current = getLocalLeaderboard();
    current.push(entry);
    current.sort((val, idx) => (val.time - idx.time) || (val.moves - idx.moves));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
}