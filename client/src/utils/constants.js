export const MEMBERSHIP_TYPES = {
  A: { name: "Free", articles: 3, videos: 3 },
  B: { name: "Basic", articles: 10, videos: 10 },
  C: { name: "Premium", articles: -1, videos: -1 },
};

export const ARTICLE_CATEGORIES = ["Saham", "Crypto", "Forex"];
export const VIDEO_CATEGORIES = [
  "Teknikal",
  "Fundamental",
  "Strategi",
  "Psikologi",
  "Crypto",
];

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
    SELECT_MEMBERSHIP: "/auth/select-membership",
    GOOGLE: "/auth/google",
    FACEBOOK: "/auth/facebook",
  },
  ARTICLES: "/articles",
  VIDEOS: "/videos",
  USERS: {
    PROFILE: "/users/profile",
    STATS: "/users/stats",
  },
};
