const elementos = document.querySelectorAll(`body *`);
console.log(elementos);
elementos.forEach((elemento) => {
  elemento.addEventListener(`click`, seletores);
  //   elemento.addEventListener(`mousemove`, efeitoSelecionar);
  //   elemento.addEventListener(`mouseleave`, retirar);
});

// serve para retirar a classe dos elementos igual ao efeitoSelecionar, mas e para quando o mouse sair do elemento
function retirar() {
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos) {
    elementos.forEach((elemento) => {
      elemento.classList.remove(`selecionado`);
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
  const elementos = document.querySelectorAll(`.selecionado`);
  if (elementos) {
    elementos.forEach((elemento) => {
      elemento.classList.remove(`selecionado`);
    });
  }
  if (!e.target.classList.contains(`selecionado`)) {
    e.target.classList.add(`selecionado`);
    // console.log(e);
  }
}

/**
 * Vai pegar os seletores(id e classe) do elemento clicado. Depois vai passar esses seletores para
 * a funcao achaFolhaEstilo (que depois vou mudar para getRegras) que vai achar as regras css do elemento clicado
 * */
function seletores(event) {
  const container = document.querySelector(`#container`);

  event.stopPropagation();
  const id = this.getAttribute(`id`);
  const classe = this.getAttribute(`class`)
    ? this.getAttribute(`class`).split(` `)
    : null;
  const tag = this.tagName.toLowerCase();
  const seletores = {
    id_elemento: id ? `#${id}` : null,
    classes: classe,
    tag: tag,
    pai: this.parentElement,
    element: this,
  };

  pegaRegrasCss(seletores);
}
/**
 * Vamos usar essa funcao para fazer um filtro nas regras, pq como nos baseamos
 * pelo ultimo seletor, alguns erros podem ocorrer, as vezes vamos ter regras que sao de
 * um seletor parecido
 * */
function filtraSeletor(seletor, regras) {
  const newRules = [];
  regras.forEach((regra, indice) => {
    if (regra.seletor_array.length > 1) regra.seletor_array.pop();
    for (let selector of regra.seletor_array) {
      let container = document.querySelector(selector);
      /*caso o selector  seja igual ao regra.seletor, quer dizer que so tem um unico seletor,
      e nao estamos utilizando um seletor ancestral para chegar ate ele*/
      if (selector === regra.seletor) {
        newRules.push(regra);
        continue;
      }
      if (container.contains(seletor.element)) {
        newRules.push(regra);
      }
    }
  });
  return newRules;
}

function pegaRegrasCss(seletor) {
  let regras1 = seletor.classes ? procuraPorClasses(seletor.classes) : null;
  let regras2 = seletor.id_elemento ? procuraPorId(seletor.id_elemento) : null;
  let regras3 = procuraSeletoresConcatenados(
    seletor.id_elemento,
    seletor.classes
  );

  regras1 = regras1 ? filtraSeletor(seletor, regras1) : [];
  regras2 = regras2 ? filtraSeletor(seletor, regras2) : [];
  regras3 = regras3 ? filtraSeletor(seletor, regras3) : [];

  seletor.regrasCss = [...regras1, ...regras2, ...regras3];
  seletor.regrasCss = evitaDuplicatas(seletor);
  console.log(seletor);
}

/**
 * Vai procurar pelo indice da folha de estilo em que o seletor esta presente. Isso e para caso
 * o site tenha varias folhas de estilo. Caso achado o indice um objeto contendo os possiveis indices e as regras css
 * serao retornados. A procura vai ser feita pelas classes presente nos elementos
 * */
function procuraPorClasses(classes) {
  let indices = [];
  let index = 0;
  for (let folha of document.styleSheets) {
    for (let seletor of folha.cssRules) {
      /*
            quando o js comecar a procurar pelos seletores, nos iremos focar nos item(classe final) finais de cada seletor,
            por exemplo:
            #container .btn {
                A palavra que o js deve verificar e btn
            }
          */
      for (let classe of classes) {
        let seletorIdentidade = seletor.selectorText.split(" ");
        if (`.` + classe == seletorIdentidade[seletorIdentidade.length - 1]) {
          //   return index;
          indices.push({
            indice: index,
            cssRules: seletor.cssText
              .replace(`{`, `$`)
              .replace(`}`, `$`)
              .split(`$`)[1]
              .split(`;`),
            seletor: seletor.selectorText,
            seletor_array: [...seletor.selectorText.split(` `)],
          });
        }
      }
    }
    index += 1;
  }
  return indices;
}

/** Vai funcionar muito semelhante ao procuraPorClasse, so que vamos focar no id */
function procuraPorId(id) {
  let indices = [];
  let index = 0;
  for (let folha of document.styleSheets) {
    for (let seletor of folha.cssRules) {
      let seletorTag = seletor.selectorText.split(" ");
      if (id == seletorTag[seletorTag.length - 1]) {
        indices.push({
          indice: index,
          cssRules: seletor.cssText
            .replace(`{`, `$`)
            .replace(`}`, `$`)
            .split(`$`)[1]
            .split(`;`),

          seletor: seletor.selectorText,
          seletor_array: [...seletor.selectorText.split(` `)],
        });
      }
    }
    index += 1;
  }
  return indices;
}
function procuraSeletoresConcatenados(id, classes) {
  let indices = [];
  let index = 0;
  //   para evitar erros
  id = id ? id : [];
  classes = classes ? classes : [];
  let possiveisSeletores = [
    classes.length > 1 ? "." + classes.join(`.`) : null,
    classes.length > 1 ? "." + classes.reverse().join(".") : null,
    "#" + id + "." + classes.join(`.`),
    "#" + id + "." + classes.reverse().join(`.`),
    "." + classes.join(`.`) + "#" + id,
    "." + classes.reverse().join(`.`) + "#" + id,
  ];
  for (let folha of document.styleSheets) {
    for (let seletor of folha.cssRules) {
      for (let seletorPossivel of possiveisSeletores) {
        if (seletorPossivel == seletor.selectorText) {
          indices.push({
            indice: index,
            cssRules: seletor.cssText
              .replace(`{`, `$`)
              .replace(`}`, `$`)
              .split(`$`)[1]
              .split(`;`),
            seletor: seletor.selectorText,
            seletor_array: [seletor.selectorText],
          });
        }
      }
    }
  }
  return indices;
}

// vai receber um objeto contendo todas as regras css de um elemento  em especifico
function evitaDuplicatas(objCss) {
  const regrasLimpas = [];

  const regrasSemiLimpas = objCss.regrasCss.filter((regra) => {
    if (
      !(regra.seletor == regra.seletor_array[regra.seletor_array.length - 1])
    ) {
      return regra;
    }
    regrasLimpas.push(regra);
  });
  /*Caso alguma regra seja igual a uma outra qualquer nada acontece, se for diferente nos 
  vamos inserir no array regrasLimpas e assim vamos evitando as duplicatas*/
  for (let index = 0; index < regrasSemiLimpas.length; index++) {
    if (regrasSemiLimpas[index] == regrasSemiLimpas[index + 1]) {
      continue;
    } else {
      regrasLimpas.push(regrasSemiLimpas[index]);
    }
  }
  return regrasLimpas;
}
