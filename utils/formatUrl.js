
export const formatUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://')) return url;
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${url}`;
};