import InlineRules from "./inlineRules.js";
import findCaracter from "./findCaracter.js";
class Match {
  #elem;
  #allRules;

  /**Vai iniciar o getAllRulesCss*/
  constructor() {
    this.getAllRulesCss();
  }
  /**Acha as regras css do elemento passado*/
  findRules(elem) {
    this.#elem = elem;
    const DadosObj = this.montaDadosElemento(this.#elem);
    for (let regra of this.#allRules) {
      if (
        this.#elem.matches(regra.selectorText) &&
        regra.selectorText.indexOf(`:`) < 0
      ) {
        DadosObj.rules_array.push(regra);
      }
      // vai descobrir uma pseudo classe do elemento e vai colocar no array de pseudo-classe
      else if (findCaracter(":", regra.selectorText) == 1) {
        let rule = regra.selectorText.split(`:`)[0];
        if (this.#elem.matches(rule)) {
          DadosObj.pseudo_classes.push(regra);
        }
      } else {
        continue;
      }
    }
    // DadosObj.rules.push(this.getInlineRules(this.#elem));
    console.log(DadosObj);
  }
  /** Vai Pegar todas as folhas de estilos externas e colocar suas regras dentro de um array*/
  getAllRulesCss() {
    let regras = [];
    for (let folha of document.styleSheets) {
      let regra = Array.from(folha.cssRules).map((rule) => rule);
      regras = [...regras, ...regra];
    }
    this.#allRules = regras;
  }

  // Como o nome diz, monta um objeto com as informacoes do elemento clicado, faz uso de getInfo()
  montaDadosElemento(elem) {
    let DadosObj = {
      id_elemento: elem.getAttribute(`id`) ? elem.getAttribute(`id`) : " ",
      classes: elem.getAttribute(`class`)
        ? elem.getAttribute(`class`).split(` `)
        : [],
      pai: this.getIdentity(elem.parentElement),
      identidade: this.getIdentity(elem),
      rules_array: [],
      pseudo_classes: [],
    };
    return DadosObj;
  }
  /**Retorna uma identificacao do elemento passado */
  getIdentity(elem) {
    let id;
    // depois rever isso aqui
    if (elem.getAttribute(`id`)) {
      id = `#` + elem.getAttribute(`id`);
    } else if (elem.classList[0]) {
      id = `.` + elem.classList[0];
    } else {
      id = ``;
    }
    let info = {
      identificacao: `${elem.tagName.toLowerCase()}${id} `,
    };
    return info.identificacao;
  }
  getInlineRules(elem) {
    const inline = new InlineRules(elem);
    return inline.getInlineRules();
  }
  /**
   * buildRules vai ser usado para iterar o array de regras de DadosObj e
   * assim simplificar o array de regras. Depois que isso tudo acontecer
   * DadosObj vai ter uma nova propriedade chamada rules. Vai ser aqui que vamos usar o getInlineRules
   * */
  buildRules() {}
}
export default Match;
