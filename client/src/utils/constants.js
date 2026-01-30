export const MEMBERSHIP_TYPES = {
  A: {
    name: "Free",
    articles: 3,
    videos: 3,
    color: "default-solid",
    bgColor: "bg-dark-500",
  },
  B: {
    name: "Basic",
    articles: 10,
    videos: 10,
    color: "primary-solid",
    bgColor: "bg-primary-500",
  },
  C: {
    name: "Premium",
    articles: -1,
    videos: -1,
    color: "warning-solid",
    bgColor: "bg-secondary-500",
  },
};

export const getMembershipInfo = (type = "A") => {
  return MEMBERSHIP_TYPES[type] || MEMBERSHIP_TYPES.A;
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
    GITHUB: "/auth/github",
  },
  ARTICLES: "/articles",
  VIDEOS: "/videos",
  USERS: {
    PROFILE: "/users/profile",
    STATS: "/users/stats",
  },
};
