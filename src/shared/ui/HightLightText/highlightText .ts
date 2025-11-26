export const highlightText = (title: string, highlight: string) => {
  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const safe = escapeRegExp(highlight);
  const regex = new RegExp(`(${safe})`, "gi");

  const result = [];
  let lastIndex = 0;

  for (const match of title.matchAll(regex)) {
    const start = match.index!;
    const end = start + match[0].length;

    if (start > lastIndex) {
      result.push({ text: title.slice(lastIndex, start), highlight: false });
    }

    result.push({ text: match[0], highlight: true });

    lastIndex = end;
  }

  if (lastIndex < title.length) {
    result.push({ text: title.slice(lastIndex), highlight: false });
  }

  return result;
};