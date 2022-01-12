import InlineRules from "./inlineRules.js";
import findCaracter from "./findCaracter.js";
class Match {
  #elem;
  #allRules;

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
    this.treatingRules(DadosObj);
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

  // Como o nome diz, monta um objeto com as informacoes do elemento clicado, faz u.so de getInfo()
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

  treatingRules(obj) {
    // usei essas classes como closures pq só vão ser utilizadas aqui
    function replaceKeys(rule) {
      rule = rule.cssText
        .replace(/ /g, "")
        .replace("{", "$")
        .replace("}", "$")
        .split("$");
      rule.pop();
      rule[1] = splitSemicolon(rule);
      return rule;
    }
    function splitSemicolon(rule) {
      rule = rule[1].split(";");
      rule.pop();
      return rule;
    }
    function desestruturaRules(obj) {
      const rules = [];
      obj.rules_array.forEach((rule) => {
        rules.push(replaceKeys(rule));
      });
      obj.rules_array = rules;
    }
    function replaceAll(texto) {
      const elementos = [];

      texto = texto
        .replace(/\#/gi, "$#")
        .replace(/\./gi, "$.")
        .replace(/ /g, "$")
        .split("$");
      // caso o primeiro elemento do array seja um elemento vazio , vamos retira-lo
      texto[0] === "" ? texto.shift() : texto[0];
      texto.forEach((elem) => {
        if (!elem.startsWith(".") && !elem.startsWith("#")) {
          console.log(elem);
          elementos.push(elem);
        }
      });
      console.log(elementos);
      return elementos.length;
    }
    function order(texto) {
      let id = findCaracter("#", texto);
      let classes = findCaracter(".", texto);
      let elementos = replaceAll(texto);

      return `0 ${id ? id : 0} ${classes ? classes : 0} ${elementos}`;
    }
    desestruturaRules(obj);
    // let rules = obj.rules_array.map((rule, index) => {
    //   let regras = rule[1].map((array) => {
    //     return {
    //       propriedade: array.split(":")[0],
    //       valor: array.split(":")[1],
    //       seletor: rule[0],
    //       indice: index,
    //       ordem: order(rule[0]),
    //     };
    //   });
    //   return regras;
    // });
    const rules = [];
    obj.rules_array.forEach((rule, index) => {
      rule[1].forEach((array) => {
        let regra = {
          propriedade: array.split(":")[0],
          valor: array.split(":")[1],
          seletor: rule[0],
          indice: index,
          ordem: order(rule[0]),
        };
        rules.push(regra);
      });
    });

    console.log(rules);
  }
}
export default Match;
