var proto = Element.prototype;
var slice = Function.call.bind(Array.prototype.slice);
var matches = Function.call.bind(
  proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.webkitMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector
);

// Returns true if a DOM Element matches a cssRule
var elementMatchCSSRule = function (element, cssRule) {
  return matches(element, cssRule.selectorText);
};

// Returns true if a property is defined in a cssRule
var propertyInCSSRule = function (prop, cssRule) {
  return prop in cssRule.style && cssRule.style[prop] !== "";
};

// Here we get the cssRules across all the stylesheets in one array
var cssRules = slice(document.styleSheets).reduce(function (rules, styleSheet) {
  return rules.concat(slice(styleSheet.cssRules));
}, []);

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
  const elementos = document.querySelectorAll(`body *`);
  console.log(elementos);
  elementos.forEach((elemento) => {
    elemento.addEventListener(`click`, () => {
      var rules = getAppliedCss(elemento);
      //   var str = "";
      for (i = 0; i < rules.length; i++) {
        var r = rules[i];
        // console.log(
        //   (str += "<br/>Style Order: " + r.order + " | Style Text: " + r.text)
        // );
        console.log(r);
      }
    });
  });

  // get a reference to an element, then...
  //   var div1 = document.getElementById("div1");

  //   var rules = getAppliedCss(div1);

  //   document.getElementById("p1").innerHTML = str;
  console.log(`ini`);
}
showStyle();
