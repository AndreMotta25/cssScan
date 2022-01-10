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
    return this.#elem.style.cssText;
  }
}
