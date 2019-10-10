/*eslint-disable */
export default function translateTitle(text) {
  const rus = new RegExp(
    /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/
  );
  const eng = new RegExp(/^[a-zA-Z]+$/);
  const splitedText = text.split("");
  let newText = [];

  for (var i = 0; splitedText.length > i; i++) {
    if (rus.test(splitedText[i])) {
      if (splitedText[i] === "а") {
        newText.push("a");
      }

      if (splitedText[i] === "А") {
        newText.push("A");
      }

      if (splitedText[i] === "б") {
        newText.push("b");
      }

      if (splitedText[i] === "Б") {
        newText.push("B");
      }

      if (splitedText[i] === "в") {
        newText.push("v");
      }

      if (splitedText[i] === "В") {
        newText.push("V");
      }
      if (splitedText[i] === "г") {
        newText.push("g");
      }

      if (splitedText[i] === "Г") {
        newText.push("G");
      }
      if (splitedText[i] === "Д") {
        newText.push("D");
      }
      if (splitedText[i] === "д") {
        newText.push("d");
      }
      if (splitedText[i] === "е") {
        newText.push("e");
      }

      if (splitedText[i] === "Е") {
        newText.push("E");
      }
      if (splitedText[i] === "Е") {
        newText.push("E");
      }

      if (splitedText[i] === "ё") {
        newText.push("e");
      }
      if (splitedText[i] === "ж") {
        newText.push("zh");
      }

      if (splitedText[i] === "Ж") {
        newText.push("ZH");
      }

      if (splitedText[i] === "з") {
        newText.push("z");
      }

      if (splitedText[i] === "З") {
        newText.push("Z");
      }

      if (splitedText[i] === "и") {
        newText.push("i");
      }
      if (splitedText[i] === "И") {
        newText.push("I");
      }

      if (splitedText[i] === "й") {
        newText.push("i");
      }
      if (splitedText[i] === "Й") {
        newText.push("I");
      }

      if (splitedText[i] === "К") {
        newText.push("K");
      }

      if (splitedText[i] === "к") {
        newText.push("k");
      }

      if (splitedText[i] === "Л") {
        newText.push("L");
      }

      if (splitedText[i] === "л") {
        newText.push("l");
      }

      if (splitedText[i] === "м") {
        newText.push("m");
      }

      if (splitedText[i] === "М") {
        newText.push("M");
      }
      if (splitedText[i] === "н") {
        newText.push("n");
      }

      if (splitedText[i] === "Н") {
        newText.push("N");
      }

      if (splitedText[i] === "о") {
        newText.push("o");
      }

      if (splitedText[i] === "О") {
        newText.push("O");
      }

      if (splitedText[i] === "п") {
        newText.push("p");
      }

      if (splitedText[i] === "П") {
        newText.push("P");
      }
      if (splitedText[i] === "р") {
        newText.push("r");
      }

      if (splitedText[i] === "Р") {
        newText.push("R");
      }
      if (splitedText[i] === "с") {
        newText.push("s");
      }

      if (splitedText[i] === "С") {
        newText.push("S");
      }
      if (splitedText[i] === "Т") {
        newText.push("T");
      }

      if (splitedText[i] === "т") {
        newText.push("t");
      }
      if (splitedText[i] === "у") {
        newText.push("u");
      }

      if (splitedText[i] === "У") {
        newText.push("U");
      }

      if (splitedText[i] === "ф") {
        newText.push("f");
      }

      if (splitedText[i] === "Ф") {
        newText.push("F");
      }
      if (splitedText[i] === "х") {
        newText.push("kh");
      }

      if (splitedText[i] === "Х") {
        newText.push("KH");
      }
      if (splitedText[i] === "ц") {
        newText.push("ts");
      }

      if (splitedText[i] === "Ц") {
        newText.push("TS");
      }
      if (splitedText[i] === "ч") {
        newText.push("ch");
      }

      if (splitedText[i] === "Ч") {
        newText.push("CH");
      }

      if (splitedText[i] === "Ш") {
        newText.push("SH");
      }

      if (splitedText[i] === "ш") {
        newText.push("sh");
      }

      if (splitedText[i] === "щ") {
        newText.push("shch");
      }

      if (splitedText[i] === "Щ") {
        newText.push("SHCH");
      }
      if (splitedText[i] === "ы") {
        newText.push("y");
      }

      if (splitedText[i] === "Ы") {
        newText.push("Y");
      }
      if (splitedText[i] === "э") {
        newText.push("e");
      }

      if (splitedText[i] === "Э") {
        newText.push("E");
      }
      if (splitedText[i] === "ю") {
        newText.push("iu");
      }

      if (splitedText[i] === "Ю") {
        newText.push("IU");
      }
      if (splitedText[i] === "я") {
        newText.push("ia");
      }

      if (splitedText[i] === "Я") {
        newText.push("IA");
      }
    } else if (eng.test(splitedText[i])) {
      newText.push(splitedText[i]);
    } else newText.push(splitedText[i]);
  }

  let textToReturn = newText.join("");
  return textToReturn;
}
