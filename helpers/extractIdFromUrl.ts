export const extractIdFromUrl = (url: string) => {
  return url.split('/').filter(Boolean).pop()!;
};
