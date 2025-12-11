export function toCapitalizeSentence(str) {
  return str
    .replace(/^_+/, "")                 // remove leading underscores
    .replace(/_/g, " ")                 // replace underscores with space
    .replace(/\s+/g, " ")               // collapse multiple spaces
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
}