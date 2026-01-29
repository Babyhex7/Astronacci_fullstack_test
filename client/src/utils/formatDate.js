// Helper: Format tanggal ke bahasa Indonesia
export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Format tanggal pendek
export const formatDateShort = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID");
};

// Format relative time (misal: "2 jam yang lalu")
export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return formatDateShort(dateString);
  } else if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  } else if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  } else if (diffMins > 0) {
    return `${diffMins} menit yang lalu`;
  } else {
    return "Baru saja";
  }
};
