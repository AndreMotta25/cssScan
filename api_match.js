import InlineRules from "./inlineRules.js";
import findCaracter from "./findCaracter.js";
class Match {
  #elem;
  #allRules;

  /**Vai iniciar o getAllRulesCss*/
  constructor() {
    // this.getAllRulesCss();
  }
  /**Acha as regras css do elemento passado*/
  findRules(elem) {
    this.getAllRulesCss();
    this.#elem = elem;
    const DadosObj = this.montaDadosElemento(this.#elem);
    for (let regra of this.#allRules) {
      if (
        this.#elem.matches(regra.selectorText) &&
        regra.selectorText.indexOf(`:`) < 0
      ) {
        DadosObj.rules_array.push(regra);
      }
      // vai descobrir uma pseudo classe do elemento e vai colocar no array de pseudo-classes
      else if (findCaracter(":", regra.selectorText) == 1) {
        let rule = regra.selectorText.split(`:`)[0];
        if (this.#elem.matches(rule)) {
          DadosObj.pseudo_classes.push(regra);
        }
        // vai descobrir um pseudo-elemento do elemento e vai colocar no array de pseudo-elementos
      } else if (findCaracter(":", regra.selectorText) == 2) {
        let rule = regra.selectorText.split(`:`)[0];
        if (this.#elem.matches(rule)) {
          DadosObj.pseudo_elementos.push(regra);
        }
      } else {
        continue;
      }
    }
    // DadosObj.rules.push(this.getInlineRules(this.#elem));
    // DadosObj.rules = this.treatingRules(DadosObj.rules_array);
    this.treatingRules();
    console.log(DadosObj);
  }
  /** Vai Pegar todas as folhas de estilos externas e colocar suas regras dentro de um array*/
  getAllRulesCss() {
    let regras = [];
    let folhaRuim;
    for (let folha of document.styleSheets) {
      try {
        if (folha.cssRules.length > 0) {
          let regra = Array.from(folha.cssRules).map((rule) => rule);
          regras = [...regras, ...regra];
        }
      } catch (err) {
        /*Caso a folha de estilo seja de um dominio diferente do site, provavelmente teremos um erro de cors. Vamos tentar
      resolver isso em atualizacoes futuras*/
        console.log(
          `impossivel pegar a folha de estilo, provavelmente e um erro de cors ${folha.href}`
        );
      }
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
      pseudo_elementos: [],
      rules: [],
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
   * DadosObj vai ter uma nova propriedade chamada rules. Vai ser aqui que vamos usar o getInlineRules *
   * */
  buildRules() {}
  /**Vai inserir uma regra em uma das folhas de extilos externa, escreva uma regra como se fosse
   * colocar no css mesmo*/
  insertRule(rule) {
    // insertRule(rule, value) {
    // this.#elem.style[rule] = value;
    const folha = document.styleSheets[0];
    folha.insertRule(rule, folha.cssRules.length);
  }
  // acho que so vai ser usado no insertRule *
  target(elem) {
    this.#elem = elem;
  }

  treatingRules() {
    let ponto = "/.gi";
    console.log(
      // findCaracter(".", "div.barra p.bio"),
      // findCaracter("#", "div.barra p.bio"),
      "div.barra p.bio".replace(/\./gi, "$"),
      "div#barra p#bio".replace(/\#/gi, "$")
    );
    console.log();
  }
}
export default Match;
