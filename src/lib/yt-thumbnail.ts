export function getYoutubeThumbnail(url: string) {
  try {
    const parsed = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsed.hostname.includes("youtu.be")) {
      return `https://img.youtube.com/vi${parsed.pathname}/hqdefault.jpg`;
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsed.searchParams.get("v")) {
      return `https://img.youtube.com/vi/${parsed.searchParams.get("v")}/hqdefault.jpg`;
    }

    // youtube.com/shorts/VIDEO_ID
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/")[2];
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
  } catch {}

  // fallback (kalau bukan youtube)
  return url;
}
