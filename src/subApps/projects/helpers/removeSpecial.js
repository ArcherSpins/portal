/*eslint-disable */
export default function removeSpecial(text) {
  const splittedText = text.split("");
  const newText = [];

  for (let i = 0; splittedText.length >= i; i++) {
    if (/[$-/:-?{-~!"^_`\[\]]/.test(splittedText[i])) {
      newText.push("");
    } else newText.push(splittedText[i]);
  }

  const joinedText = newText.join("");
  return joinedText;
}
