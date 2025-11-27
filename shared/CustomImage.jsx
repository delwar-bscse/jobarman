import Image from "next/image";

export default function CustomImage({
  src = "",
  title = "",
  width = 100,
  height = 100,
  className = "",
}) {
  const image = src?.startsWith("http")
    ? src
    : `${process.env.NEXT_PUBLIC_IMAGE_URL || ""}${src}`;

  return (
    <Image
      src={image}
      alt={title}
      width={width}
      height={height}
      sizes="100vw"
      className={`object-cover ${className}`}
    />
  );
}
