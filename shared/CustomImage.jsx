import Image from "next/image";

export default function CustomImage({
  src,
  title,
  width = 10,
  height = 10,
  className,
}) {
  const image = src?.startsWith("http")
    ? src
    : `${process.env.IMAGE_URL}/${src}`;

  return (
    <Image
      src={image}
      alt={title}
      width={width}
      height={height}
      sizes="100vh"
      className={`object-cover ${className}`}
    />
  );
}
