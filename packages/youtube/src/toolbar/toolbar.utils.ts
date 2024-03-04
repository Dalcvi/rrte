export const getYouTubeID = (youtubeUrl: string): string | null => {
  const regex: RegExp = /(?<=v=|\/)[\w-]{11}(?=\&|\?|$)/;
  const match: RegExpMatchArray | null = youtubeUrl.match(regex);
  if (match) {
    return match[0];
  }
  return null;
};
