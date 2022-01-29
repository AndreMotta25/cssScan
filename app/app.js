// "use strict";
// vamos criar a interface orientada a objetos
var eventoWindow = false;
class Interface {
  constructor(elem, controls) {
    this.controls = controls;
    this.controls.ativo = true;
    this.controls.static = false;
    this.rulesStorageToCopy = "";
    this.match = new Match();
    this.janela = this.buildWindow(elem);
    this.iniciarComandos();
  }
  handlePress(e) {
    e.stopPropagation();
    if (e.key == `F2` && !this.controls.static && this.controls.ativo) {
      this.controls.static = true;
      this.controls.ativo = true;
    } else if (e.key == "F2" && this.controls.static && this.controls.ativo) {
      this.controls.static = false;
      this.destroy();
      let x = 0;
      while (x <= 10) {
        x += 1;
      }
    }
  }
  makeStatic() {
    if (!window.eventoWindow) {
      window.addEventListener("keydown", (e) => {
        this.handlePress(e);
      });
      window.eventoWindow = true;
    }
  }
  // console.log(this.janela);
  // this.janela.addEventListener("keydown", this.handlePress);

  buildWindow(elem) {
    this.elem = elem;
    this.elem.classList.add(`selecionado`);
    this.rules = this.match.findRules(elem);
    console.log(this.rules);
    // if (!this.ativo) {
    // this.ativo = true;

    const div = document.createElement("div");
    div.setAttribute("id", "container32443254");
    // console.log(e);
    div.innerHTML = `
      <header class="header-container">
        <h2 id="name" class="header-container-item-name">${
          this.rules.identidade
        }</h2>
        <div
          id="parent"
          class="header-container-item-parent"
          data-tooltip="${this.rules.pai}"
        >
          <img src="./icones/parent.svg" alt="pai" />
        </div>
      </header>
      <div id="body">
      <code>
        <ul class="body-item-regras"> 
          ${this.rules.rules_array
            .map((elem) => {
              console.log(elem);
              if (elem.ativo) {
                this.rulesStorageToCopy += `${elem.propriedade}:${elem.valor};`;
                return `
              <li class='item-regra'>
                <span class='propriedade-item'>${elem.propriedade}:</span>
                 <span class="valor-item">${elem.valor}</span>
              </li>`;
              } else {
                `<li class="item-regra item-sobreescrito">
                <span class="propriedade-item">${elem.propriedade}:</span>
                
                <span class="valor-item">${elem.valor}</span>
              </li>`;
              }
            })
            .join("")}
        </ul>
        </code>
        <div class="box-rules">
          <textarea id="box-rules-item-box"></textarea>
          <div id="box-rules-item-insert" data-tooltip="Adicionar">
            <button class="item btn" id="btn_insertRule">
              <img src="./icones/insert.svg" alt="inserir" />
            </button>
          </div>
        </div>
        <ul id="lista-opcoes">
          <li class="lista-opcoes-item">
            <button class="btn" id="classe">
              <img src="./icones/classes.svg" alt="classes" />
            </button>
            <div class="mini-modal">
              <h3>classes</h3>
              ${this.rules.classes
                .map(
                  (classe) =>
                    `<span class='caixa-classes-item'>.${classe}</span>`
                )
                .join("")}
              
            </div>
          </li>
          
          <li class="lista-opcoes-item" data-tooltip="Copiar">
            <button class="btn" id="copy">
              <img src="./icones/copy.svg" alt="copy" />
            </button>
          </li>
          <li class="lista-opcoes-item">
            <button class="btn">
              <img src="./icones/atributos.svg" alt="atributos" />
            </button>
            <span class="tooltip">Atributos</span>
          </li>
        </ul>
      </div>
      <footer>
        <p>Desenvolvido por Andre Motta</p>
      </footer>`;
    document.body.appendChild(div);
    this.toolTips();
    // div.style.left = e.clientX - 10 + "px";
    // div.style.top = e.clientY - 10 + "px";
    return div;
    // }
  }
  // aqui vai chamar a api
  initInsertRule() {
    const btn = document.querySelector("#btn_insertRule");
    this.makeEvent(btn, `click`, () => {
      let texto = document.querySelector(`#box-rules-item-box`).value;
      if (texto) {
        this.match.insertRule(texto);
        this.warning("Estilo Inserido!!");
        document.querySelector(`#box-rules-item-box`).value = "";
        // console.log(`Estilo Inserido!!`);
      }
    });
  }
  initCopy() {
    // this.rulesStorageToCopy.select();
    const btnCopy = document.querySelector("#copy");
    btnCopy.addEventListener("click", () => {
      this.warning("copiando");
      let inputTexto = document.createElement("input");
      inputTexto.value = this.rulesStorageToCopy;
      inputTexto.select();
      navigator.clipboard.writeText(inputTexto.value);
    });
  }
  initStyle() {
    if (!document.querySelector(`#InterfaceJanela324`)) {
      const style = document.createElement(`style`);
      style.setAttribute(`id`, `InterfaceJanela324`);
      style.textContent = `
      /* inicio efeitos um tanto especificos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.item-sobreescrito {
  text-decoration: line-through 2px white;
}
.selecionado {
  border: 2px dotted red;
}
.tooltip {
  padding: 10px 20px;
  background-color: #393939;
  border-radius: 10px;
  color: #40e03d;
  font-size: 18px;
  letter-spacing: 3px;
  position: absolute;
  opacity: 1;
  display: block;
  visibility: hidden;
}
.btn {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
}
/* fim efeitos um tanto especificos */
/* ============================================= */
#container32443254 {
  background-color: #444444;
  max-width: 420px;
  border-radius: 20px;
  margin: 50px auto;
  position: absolute;
  
}

.header-container {
  display: flex;
  justify-content: space-between;
  background-color: #312f2f;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.header-container-item-name {
  font-size: 18px;
  letter-spacing: 3px;
  color: #00b2ff;
  font-weight: 100;
}
.header-container-item-parent{
  cursor:pointer
}
.header-container-item-parent:hover .tooltip {
  animation: showToolTip ease-in 1s ;
}
#body {
  padding: 20px;
}
.body-item-regras {
  margin-bottom: 80px;
}
.body-item-regras .item-regra {
  list-style: none;
}
.body-item-regras .item-regra .propriedade-item {
  font-size: 18px;
  letter-spacing: 3px;
  color: #fba31e;
}
.body-item-regras .item-regra .valor-item {
  font-size: 16px;
  letter-spacing: 3px;
  color: #cc4ef8;
}

.box-rules {
  background-color: #565555;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}
#box-rules-item-box {
  color: #cc4ef8;
  width: 80%;
  border: none;
  background-color: #565555;
  outline: none;
  border-radius: 10px;
  font-size: 18px;
  min-height: 148px;
  padding: 15px;
  resize: none;
}
/* vai sumir com o scroll do textArea */
#box-rules-item-box::-webkit-scrollbar {
  width: 4px;
}
#box-rules-item-insert {
  position: relative;
}

#box-rules-item-insert .item:hover {
  background-color: rgba(0, 0, 0, 50%);
  border-radius: 50%;
}
#box-rules-item-insert:hover .tooltip {
  animation: showToolTip ease-in 0.6s;
}

#lista-opcoes {
  display: flex;
  max-width: 350px;
  justify-content: space-between;
  margin: 20px auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
  background-color: #565555;
  border-radius: 10px;
  padding: 0 20px;
  position: relative;
}
#lista-opcoes .lista-opcoes-item {
  list-style-type: none;
}

.lista-opcoes-item .mini-modal {
  width: 100%;
  max-width: 200px;
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #312f2f;
  color: #40e03d;
  letter-spacing: 3px;
  padding: 15px;
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
}
.lista-opcoes-item:hover .mini-modal {
  visibility: visible;
  opacity: 1;
  transition: all 0.7s;
}
.lista-opcoes-item:hover .tooltip {
  animation: showToolTipTravar ease-in 1s ;
}

footer {
  width: 100%;
  background-color: #312f2f;
  text-align: center;
  padding: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: 18px;
  letter-spacing: 3px;
  color: #00b2ff;
}
/* tiver que usar a animação pq ao colocar o elemento de 
supetao na tela o transition nao funcionava e assim 
o elemento acabava por aparecer muito rapido */
@keyframes showToolTip {
  from {
    opacity: 0;
    transform: translate(52%, -140%);
  }
  to {
    opacity: 1;
    visibility: visible;
    transform: translate(52%, -120%);
  }
}
@keyframes showToolTipTravar {
  from {
    opacity: 0;
    transform: translate(00%, -50%);
  }
  to {
    opacity: 1;
    visibility: visible;
    transform: translate(0%, -30%);
  }
}
.selecionado {
  border: 2px solid red;
}
.warning {
  position:fixed;
  padding:10px;
  background-color: #312f2f;
  border:2px solid #40e03d;
  color:#40e03d;
  font-weight: bold;
  border-radius:10px;
  animation: showWarning ease-in 0.5s forwards; 
}
@keyframes showWarning {
  from {
    // transform: translate(-52%, -250%);
    top:-5%;
    right:-10%
  }
  to {
    // transform: translate(0%, -120%);
    right:0%;
  }
    `;
      document.head.appendChild(style);
    } else {
      document.querySelector(`#InterfaceJanela324`).remove();
    }
  }
  iniciarComandos() {
    this.initInsertRule();
    this.initStyle();
    this.makeStatic();
    this.initCopy();
  }
  makeEvent(elem, type, func) {
    elem.addEventListener(type, func);
    return elem;
  }
  /**Vai destruir a janela*/
  destroy() {
    if (this.controls.ativo && !this.controls.static) {
      this.controls.ativo = false;
      this.initStyle();
      // this.janela.removeEventListener("keydown", this.handlePress);
      console.log(this.janela);
      // this.janela.remove();
      this.elem.classList.remove(`selecionado`);
      document.body.removeChild(document.querySelector(`#container32443254`));
    } else {
      console.log(`Impossivel destruir a janela `);
    }
  }
  toolTips() {
    const tooltips = document.querySelectorAll("[data-tooltip]");
    console.log(tooltips);
    tooltips.forEach((tag) => {
      tag.addEventListener("mouseenter", () => {
        let texto = tag.dataset.tooltip;
        const span = document.createElement("span");
        span.classList.add("tooltip");
        span.textContent = texto;
        tag.appendChild(span);
      });
      tag.addEventListener("mouseleave", () => {
        const filho = tag.querySelector(".tooltip");
        filho.remove();
      });
    });
  }
  warning(texto) {
    const span = document.createElement("span");
    span.textContent = texto;
    span.classList.add("warning");
    document.body.appendChild(span);
    // vai retirar o aviso
    setTimeout(() => {
      span.remove();
    }, 2000);
  }
}

/**Um objeto especifico para pegar as regras inlines
 */
class InlineRules {
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
    return objRules;
  }
}

class Match {
  #elem;
  #allRules;

  constructor() {
    // this.getAllRulesCss();
  }
  /**Acha as regras css do elemento passado*/
  findCaracter(caracter, texto) {
    let totRepeat = [];
    if (caracter && texto) {
      let count = 0;

      let pos;

      while (pos != -1) {
        count++;
        pos = texto.indexOf(caracter, pos + 1 /* o mesmo que 3 + 1 */);
        if (pos != -1) {
          totRepeat.push(pos);
        }
      }
    }

    return totRepeat.length;
  }
  findRules(elem) {
    this.getAllRulesCss();
    this.#elem = elem;
    const DadosObj = this.montaDadosElemento(this.#elem);
    // console.log(this.#allRules);
    // console.log(DadosObj);
    console.log(this.#allRules);
    for (let regra of this.#allRules) {
      // if (regra) {
      if (
        this.#elem.matches(regra.selectorText) &&
        regra.selectorText.indexOf(`:`) < 0
      ) {
        DadosObj.rules_array.push(regra);
      }
      // vai descobrir uma pseudo classe do elemento e vai colocar no array de pseudo-classes
      else if (this.findCaracter(":", regra.selectorText) == 1) {
        let rule = regra.selectorText.split(`:`)[0];
        if (this.#elem.matches(rule)) {
          DadosObj.pseudo_classes.push(regra);
        }
        // vai descobrir um pseudo-elemento do elemento e vai colocar no array de pseudo-elementos
      } else if (this.findCaracter(":", regra.selectorText) == 2) {
        let rule = regra.selectorText.split(`:`)[0];
        if (this.#elem.matches(rule)) {
          DadosObj.pseudo_elementos.push(regra);
        }
      } else {
        continue;
      }
      // }
    }
    console.log(DadosObj);
    return this.treatingRules(DadosObj);
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
    // let classesFiltradas = elem.getAttribute(`class`)
    //   ? elem.getAttribute(`class`).split(` `)
    //   : [];
    // classesFiltradas = classesFiltradas.filter(
    //   (classe) => classe !== "selecionado"
    // );
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
    //  elem.getAttribute(`class`)? elem.getAttribute(`class`).split(` `): []
  }
  /**Retorna uma identificacao do elemento passado */
  getIdentity(elem) {
    let id;
    // depois rever isso aqui
    if (elem.getAttribute(`id`)) {
      id = `#` + elem.getAttribute(`id`);
    } else if (elem.classList[0] && elem.classList[0] !== "selecionado") {
      id = `.` + elem.classList[0];
    } else {
      id = ``;
    }
    let info = {
      identificacao: `${elem.tagName.toLowerCase()}${id} `,
    };
    return info.identificacao;
  }
  /**Vai ser usada por treatingRules, serve para pegar as regras inlines*/
  getInlineRules(elem) {
    const inline = new InlineRules(elem);
    return inline.getInlineRules();
  }

  /**Vai inserir uma regra em uma das folhas de extilos externa, escreva uma regra como se fosse
   * colocar no css mesmo, a regra nao vai ser especifica do elemento selecionado*/
  insertRule(rule) {
    const folha = document.styleSheets[0];
    folha.insertRule(rule, folha.cssRules.length);
  }
  /**
   usei essas funçoes como closures pq só vão ser utilizadas aqui, vai fazer um tratamento no objeto
   * */
  treatingRules(obj) {
    const objMaster = this;
    // vai retirar as chaves de cada regraCSS, faz uso do splitSemicolon
    function replaceKeys(rule) {
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
    function simplificaRules(obj) {
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
      // retirando um erro
      let elementosTot = [];
      elementos.forEach((elem) => {
        if (elem != "") {
          elementosTot.push(elem);
        }
      });
      console.log(elementosTot);
      return elementosTot.length;
    }
    // retorna a ordem de procedencia
    function order(texto) {
      console.log(objMaster);
      let id = objMaster.findCaracter("#", texto);
      let classes = objMaster.findCaracter(".", texto);
      let elementos = replaceAll(texto);

      return `0${id ? id : 0}${classes ? classes : 0}${elementos}`;
    }
    function criaObjetoRegra() {
      simplificaRules(obj);
      const rules = [];
      obj.rules_array.forEach((rule, index) => {
        rule[1].forEach((array) => {
          let regra = {
            propriedade: array.split(":")[0],
            valor: array.split(":")[1],
            seletor: rule[0],
            indice: index,
            ordem: Number(order(rule[0])),
            ativo: null,
            procedencia: order(rule[0]),
          };
          rules.push(regra);
        });
      });
      obj.rules_array = rules;
      return obj.rules_array;
    }
    /** Descobre quais regras css estão ativa*/
    function validaRegras(rules) {
      const regrasInlines = objMaster.getInlineRules(objMaster.#elem);
      rules = [...rules, ...regrasInlines];
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
        obj.rules_array = rules;
      });
    }
    criaObjetoRegra();
    validaRegras(obj.rules_array);
    return obj;
  }
}

function abrirJanela(e) {
  e.stopPropagation();
  console.log(`abrindo`);
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos && !windowInterface.ativo) {
    elementos.forEach((elemento) => {
      elemento.classList.remove(`selecionado`);
    });
  }
  if (!e.target.classList.contains(`selecionado`) && !windowInterface.ativo) {
    e.target.classList.add(`selecionado`);
    // adiciona o estilo
    windowInterface.initStyle();
    windowInterface.buildWindow(this, e);
  }
}
function fecharJanela(e) {
  e.stopPropagation();
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos) {
    elementos.forEach((elemento) => {
      if (!windowInterface.estatica && windowInterface.ativo == true) {
        document.querySelector("#container32443254").remove();
        windowInterface.estatica = false;
        windowInterface.ativo = false;
        elemento.classList.remove(`selecionado`);
        console.log(`removendo`);
        // remove o estilo
        windowInterface.initStyle();
      }
    });
  }
}

let windowInterface = {};
var controls = {
  ativo: false,
  static: false,
};
const elementos = document.querySelectorAll(`body *`);
elementos.forEach((elemento) => {
  elemento.addEventListener(`mouseover`, (e) => {
    e.stopPropagation();
    if (!controls.ativo) {
      console.log(`iniciando`);
      windowInterface = new Interface(elemento, controls);
    }

    // windowInterface.ativo = true;
  });
  elemento.addEventListener(`mouseout`, (e) => {
    if (!controls.static && controls.ativo) {
      e.stopPropagation();
      console.log(`saindo`);
      // console.log(windowInterface.static);
      windowInterface.destroy();
    }
  });
});
