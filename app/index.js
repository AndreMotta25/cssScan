const elementos = document.querySelectorAll(`body *`);
const janelaScan = {
  ativo: false,
  estatica: false,
};
elementos.forEach((elemento) => {
  elemento.addEventListener(`mouseover`, efeitoSelecionar);
  elemento.addEventListener(`mouseout`, retirar);
});
window.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key == " " && !janelaScan.estatica) {
    janelaScan.estatica = true;
  } else {
    janelaScan.estatica = false;
    retirar(e);
  }
});
// serve para retirar a classe dos elementos igual ao efeitoSelecionar, mas e para quando o mouse sair do elemento
function retirar(e) {
  e.stopPropagation();
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos) {
    elementos.forEach((elemento) => {
      if (!janelaScan.estatica) {
        document.querySelector("#container").remove();
        janelaScan.estatica = false;
        janelaScan.ativo = false;
        elemento.classList.remove(`selecionado`);
      }
    });
  }
}
/**
 * Quando o mouse passar por cima de um elemento, o js vai colocar uma classe chamada selecionado,
 * que serve para colocar uma borda no elemento  html, para mostrar que  o mesmo esta em evidencia
 * */
function efeitoSelecionar(e) {
  /*Para o js colocar a classe selecionado em outro elemento, o mesmo deve verificar se nao existe mas nenhum outro
        caso exista, a classe sera retirada
      */
  e.stopPropagation();
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos && !janelaScan.ativo) {
    elementos.forEach((elemento) => {
      elemento.classList.remove(`selecionado`);
    });
  }
  if (!e.target.classList.contains(`selecionado`) && !janelaScan.ativo) {
    e.target.classList.add(`selecionado`);
    montarJanela();

    // console.log(e);
  }
}

function montarJanela() {
  //   e.stopPropagation();
  if (!janelaScan.ativo) {
    janelaScan.ativo = true;
    const div = document.createElement("div");
    div.setAttribute("id", "container");
    div.innerHTML = `
      <header class="header-container">
        <h2 id="name" class="header-container-item-name">#container</h2>
        <div
          id="parent"
          class="header-container-item-parent"
          data-tooltip="Pai"
        >
          <img src="./icones/parent.svg" alt="pai" />
          <!-- <span class="tooltip">pai</span> -->
        </div>
      </header>
      <div id="body">
        <ul class="body-item-regras">
          <li class="item-regra">
            <span class="propriedade-item">background-color:</span>
            <span class="valor-item">black</span>
          </li>
          <li class="item-regra">
            <span class="propriedade-item">font-size:</span>
            <span class="valor-item">20px</span>
          </li>
          <li class="item-regra">
            <span class="propriedade-item">width:</span>
            <span class="valor-item">100px</span>
          </li>
          <li class="item-regra">
            <span class="propriedade-item">text-decoration:</span>
            <span class="valor-item">none</span>
          </li>
          <li class="item-regra item-sobreescrito">
            <span class="propriedade-item">text-decoration:</span>
            <span class="valor-item">underline</span>
          </li>
        </ul>
        <div class="box-rules">
          <textarea id="box-rules-item-box"></textarea>
          <div id="box-rules-item-insert" data-tooltip="Adicionar">
            <button class="item btn">
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
              <span class="caixa-classes-item">.btn</span>
              <span class="caixa-classes-item">.selecionado</span>
              <span class="caixa-classes-item">.btn1</span>
            </div>
          </li>
          <li class="lista-opcoes-item" id="stop" data-tooltip="Travar Janela">
            <button class="btn">
              <img src="./icones/stop.svg" alt="stop" />
            </button>
            <!-- <span class="tooltip">Travar Janela</span> -->
          </li>
          <li class="lista-opcoes-item" data-tooltip="Copiar">
            <button class="btn">
              <img src="./icones/copy.svg" alt="copy" />
            </button>
            <!-- <span class="tooltip">Copiar</span> -->
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
  }
}
function insertRule() {}
function copy() {}
function tornarEstatico() {}
