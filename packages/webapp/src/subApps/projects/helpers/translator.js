/*eslint-disable */
export default function translate(text) {
  const rus = new RegExp(
    /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/
  );
  const eng = new RegExp(/^[a-zA-Z]+$/);
  const numbers = new RegExp(/^[0-9]+$/);
  const splitedText = text.split("");
  let newText = [];

  for (var i = 0; splitedText.length > i; i++) {
    if (rus.test(splitedText[i])) {
      if (splitedText[i] === "а") {
        newText.push("a");
      }

      if (splitedText[i] === "б") {
        newText.push("b");
      }
      if (splitedText[i] === "в") {
        newText.push("v");
      }
      if (splitedText[i] === "г") {
        newText.push("g");
      }
      if (splitedText[i] === "д") {
        newText.push("d");
      }
      if (splitedText[i] === "е") {
        newText.push("e");
      }
      if (splitedText[i] === "ё") {
        newText.push("e");
      }
      if (splitedText[i] === "ж") {
        newText.push("zh");
      }
      if (splitedText[i] === "з") {
        newText.push("z");
      }
      if (splitedText[i] === "и") {
        newText.push("i");
      }
      if (splitedText[i] === "й") {
        newText.push("i");
      }
      if (splitedText[i] === "к") {
        newText.push("k");
      }
      if (splitedText[i] === "л") {
        newText.push("l");
      }
      if (splitedText[i] === "м") {
        newText.push("m");
      }
      if (splitedText[i] === "н") {
        newText.push("n");
      }
      if (splitedText[i] === "о") {
        newText.push("o");
      }
      if (splitedText[i] === "п") {
        newText.push("p");
      }
      if (splitedText[i] === "р") {
        newText.push("r");
      }
      if (splitedText[i] === "с") {
        newText.push("s");
      }
      if (splitedText[i] === "т") {
        newText.push("t");
      }
      if (splitedText[i] === "у") {
        newText.push("u");
      }
      if (splitedText[i] === "ф") {
        newText.push("f");
      }
      if (splitedText[i] === "х") {
        newText.push("kh");
      }
      if (splitedText[i] === "ц") {
        newText.push("ts");
      }
      if (splitedText[i] === "ч") {
        newText.push("ch");
      }
      if (splitedText[i] === "ш") {
        newText.push("sh");
      }
      if (splitedText[i] === "щ") {
        newText.push("shch");
      }
      if (splitedText[i] === "ы") {
        newText.push("y");
      }
      if (splitedText[i] === "э") {
        newText.push("e");
      }
      if (splitedText[i] === "ю") {
        newText.push("iu");
      }
      if (splitedText[i] === "я") {
        newText.push("ia");
      }
    } else if (eng.test(splitedText[i])) {
      newText.push(splitedText[i]);
    } else if (splitedText[i] === " " || splitedText[i] === "_") {
      newText.push("_");
    } else if (numbers.test(splitedText[i])) {
      newText.push(splitedText[i]);
    }
  }

  let textToReturn = newText.join("").toLowerCase();
  return textToReturn;
}
