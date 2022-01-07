var proto = Element.prototype;

/**
 * é uma forma interessante de criar uma funçao
 * Pelo que pude entender, o slice vai ser responsavel por transformar a CssStyleSheet
 * em um array.
 * */
var slice = Function.call.bind(Array.prototype.slice);
var matches = Function.call.bind(
  proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.webkitMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector
);

// Retorna verdadeiro se um elemento DOM corresponder a um cssRule
var elementMatchCSSRule = function (element, cssRule) {
  return matches(element, cssRule.selectorText);
};

// Retorna verdadeiro se uma propriedade é definida em um cssRule
var propertyInCSSRule = function (prop, cssRule) {
  return prop in cssRule.style && cssRule.style[prop] !== "";
};

// Aqui obtemos as cssRules em todas as folhas de estilo em uma matriz
/**
 * Oque sei até agora é que slice vai jogar styleSheets em forma de array para o reduce
 * rules é o acumulador. rules é um array, pq o segundo parametro do callback é um array
 *
 * */
var cssRules = slice(document.styleSheets).reduce(function (rules, styleSheet) {
  console.log(rules);
  return rules.concat(slice(styleSheet.cssRules));
}, []);

// obtenha apenas as regras de css que correspondem a esse elemento
var getAppliedCss = function (elm) {
  // get only the css rules that matches that element
  var elementRules = cssRules.filter(elementMatchCSSRule.bind(null, elm));
  var rules = [];
  if (elementRules.length) {
    for (i = 0; i < elementRules.length; i++) {
      var e = elementRules[i];
      rules.push({
        order: i,
        text: e.cssText,
      });
    }
  }

  if (elm.getAttribute("style")) {
    rules.push({
      order: elementRules.length,
      text: elm.getAttribute("style"),
    });
  }
  return rules;
};

function showStyle() {
  var styleSheetList = document.styleSheets;

  console.log(styleSheetList);
  const elementos = document.querySelectorAll(`body *`);
  console.log(elementos);
  elementos.forEach((elemento) => {
    elemento.addEventListener(`click`, () => {
      var rules = getAppliedCss(elemento);
      for (i = 0; i < rules.length; i++) {
        var r = rules[i];
        console.log(r);
      }
    });
  });
}
showStyle();
