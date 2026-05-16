// HighlightPhrase — wraps the matching occurrence of `phrase` inside `text`
// in a <mark> element so the dialogue lines visually highlight the expression
// being learned.
//
// Case-insensitive match. If the phrase doesn't appear, renders the plain text.

export default function HighlightPhrase({ text, phrase }) {
  if (!text || !phrase) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + phrase.length)}</mark>
      {text.slice(idx + phrase.length)}
    </span>
  );
}
