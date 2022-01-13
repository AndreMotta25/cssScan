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
  // usei essas funçoes como closures pq só vão ser utilizadas aqui
  treatingRules(obj) {
    // vai retirar as chaves de cada regraCSS, faz uso do splitSemicolon
    function replaceKeys(rule) {
      console.log(rule);
      rule = rule.cssText
        .replace(/ /g, " ")
        .replace("{", "$")
        .replace("}", "$")
        .split("$");
      rule.pop();
      rule[1] = splitSemicolon(rule);
      return rule;
    }
    // vai dividir as regras aonde tiver ;
    function splitSemicolon(rule) {
      rule = rule[1].split(";");
      rule.pop();
      return rule;
    }
    /*vai usar o replaceKeys para retirar as chaves, essa funçao da uma diminuida no rules_array
    pelo que lembro, desestruturaRules ainda vai fazer retirar o ; atraves do replaceKeys que usa 
    o splitSemicolon*/
    function desestruturaRules(obj) {
      const rules = [];
      obj.rules_array.forEach((rule) => {
        rules.push(replaceKeys(rule));
      });
      obj.rules_array = rules;
    }
    // modifica a string do seletor para descobrir a ordem de procedencia, que
    // faz uso dessa funçao é a order
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
          elementos.push(elem);
        }
      });
      return elementos.length;
    }
    // retorna a ordem de procedencia
    function order(texto) {
      let id = findCaracter("#", texto);
      let classes = findCaracter(".", texto);
      let elementos = replaceAll(texto);

      return `0 ${id ? id : 0} ${classes ? classes : 0} ${elementos}`;
    }

    function criaObjetoRegra() {
      desestruturaRules(obj);
      const rules = [];
      obj.rules_array.forEach((rule, index) => {
        rule[1].forEach((array) => {
          let regra = {
            propriedade: array.split(":")[0],
            valor: array.split(":")[1],
            seletor: rule[0],
            indice: index,
            ordem: order(rule[0]),
            ativo: null,
          };
          rules.push(regra);
        });
      });
      obj.rules_array = rules;
      return obj.rules_array;
    }
    function existe(rules) {
      const objRegras = {};
      rules.forEach((prop) => {
        if (objRegras.hasOwnProperty(prop["propriedade"])) {
          // caso os seletores sejam iguais
          if (objRegras[prop["propriedade"]]["seletor"] == prop["seletor"]) {
            let objPropriedade = objRegras[prop["propriedade"]];
            /** 
               caso o seletor seja igual, quer dizer que temos um impate, e o indice vai usar a logica da
               cascata e vai desempatar
             */
            prop["ativo"] =
              objPropriedade["indice"] < prop["indice"] ? true : false;
            objPropriedade["ativo"] =
              objPropriedade["indice"] < prop["indice"] ? false : true;
          } else {
            let objPropriedade = objRegras[prop["propriedade"]];
            if (objPropriedade["ordem"] != prop["ordem"]) {
              prop["ativo"] =
                objPropriedade["ordem"] < prop["ordem"] ? true : false;
              objPropriedade["ativo"] =
                objPropriedade["ordem"] > prop["ordem"] ? true : false;
            } else {
              prop["ativo"] =
                objPropriedade["indice"] < prop["indice"] ? true : false;
              objPropriedade["ativo"] =
                objPropriedade["indice"] < prop["indice"] ? false : true;
            }
          }
        } else {
          prop["ativo"] = true;
          objRegras[prop["propriedade"]] = prop;
        }
      });
    }
    criaObjetoRegra();
    existe(obj.rules_array);
    // console.log(rules);
  }
}
export default Match;
