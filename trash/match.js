// LEMBRAR DEPOIS DE PASSAR TUDO PARA INGLES, NOMES DE VARIAVEIS , COMENTARIOS

const elementosHtml = document.querySelectorAll(`body *`);
elementosHtml.forEach((elem) => {
  elem.addEventListener(`click`, DescobreSeletorValido);
});

function DescobreSeletorValido(e) {
  e.stopPropagation();
  const regras = getAllRulesCss();
  const DadosObj = montaDadosElemento(this);
  for (let regra of regras) {
    if (this.matches(regra.selectorText)) {
      DadosObj.rules.push(regra);
    }
  }
  console.log(DadosObj);
}

/** Vai Pegar todas as folhas de estilos externas e colocar suas regras dentro de um array*/
function getAllRulesCss() {
  let regras = [];
  for (let folha of document.styleSheets) {
    let regra = Array.from(folha.cssRules).map((rule) => rule);
    regras = [...regras, ...regra];
  }

  return regras;
}

/**retorna uma string que serve para identificar o elemento passado, por meio de um id ou classe.
 * Caso o elemento passado nao tenha nenhum identificador, so o tipo da tag sera retornado
 */
function getInfo(elem) {
  // let info =
  let info = {
    identificacao: `${elem.tagName.toLowerCase()}${
      elem.classList[0]
        ? "." + elem.classList[0]
        : "#" + elem.getAttribute(`id`) || ` `
    } `,
  };
  return info.identificacao;
}
// Como o nome diz, monta um objeto com as informacoes do elemento clicado, faz uso de getInfo()
function montaDadosElemento(elem) {
  let DadosObj = {
    id_elemento: elem.getAttribute(`id`),
    classes: elem.getAttribute(`class`)
      ? elem.getAttribute(`class`).split(` `)
      : [],
    pai: getInfo(elem.parentElement),
    id: getInfo(elem),
    rules: [],
  };
  return DadosObj;
}
