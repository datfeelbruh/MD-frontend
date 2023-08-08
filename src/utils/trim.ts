export default function trim(text: string, trimSize: number = 180, maxSize: number = trimSize + 32) {
  if (text.length <= trimSize) return text;
  let trimIdx = text.slice(trimSize).indexOf('.');
  if (trimIdx > maxSize) trimIdx = text.slice(trimSize).indexOf(' ');
  return text.slice(0, trimSize + trimIdx) + "...";
}
