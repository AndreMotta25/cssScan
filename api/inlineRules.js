/**Vai pegar as regras css inline que estao no elemento passado.
 * Vamos deixar para pegar regras inline bem no final, quando tivermos todas as regras ja em
 * um unico lugar
 */
export default class InlineRules {
  #elem;
  constructor(elem) {
    this.#elem = elem;
  }
  getInlineRules() {
    const objRules = [];
    let rules = this.#elem.style.cssText.replace(/;/g, ";#").split("#");
    rules.forEach((rule) => {
      if (rule != "") {
        // ========== faz um tratamemto ===========
        rule = rule.replace(/ /g, "").replace(/:/g, ":#");
        rule = rule.split("#");
        // ========== faz um tratamemto ===========
        // cria um objetoRegra
        let regra = {
          propriedade: " " + rule[0].replace(":", ""),
          valor: rule[1],
          seletor: "inline",
          indice: 9999,
          ordem: 9999,
          ativo: true,
        };
        objRules.push(regra);
      }
    });
    console.log(objRules);
    return objRules;
  }
}
