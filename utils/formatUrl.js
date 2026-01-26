export const formatUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  else if (url.startsWith("http")) return url;
  else if (url.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`;
  } else {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${url}`;
  }
};
