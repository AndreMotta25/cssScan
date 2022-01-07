function concatenado() {
  let possiveisClasses = [];
  const arr = ["#botao", ".btn1", ".btn", ".selecionado"];
  const seletores = [["#botao"], [".btn1", ".btn", ".selecionado"]];
  let possibilidades = (arr.length - 1) * arr.length * arr.length * 2;
  //   for (let x = 0; x < 12; x++) {
  //     let seletor = seletores.sort(() => Math.random() - 0.5);
  //     console.log(seletor.join(""));
  //   }
  const embaralha = () => {
    let seletor = arr.sort(() => Math.random() - 0.5);
    console.log("Sdas");
    return seletor;
  };
  console.log(possibilidades);
  //   const embaralha = () => {
  //     // Loop em todos os elementos
  //     for (let i = arr.length - 1; i > 0; i--) {
  //       // Escolhendo elemento aleatório
  //       const j = Math.floor(Math.random() * (i + 1));
  //       // Reposicionando elemento
  //       [arr[i], arr[j]] = [arr[j], arr[i]];
  //     }
  //     // Retornando array com aleatoriedade
  //     return arr;
  //   };

  let x = 0;
  //   while (x < seletores[1].length) {
  while (x < possibilidades) {
    let stringClass = "";
    // for (let classe of seletores[1].reverse()) {
    //   stringClass += classe;
    //   possiveisClasses.push(stringClass);
    // }

    for (let classe of embaralha()) {
      stringClass += classe;
      possiveisClasses.push(stringClass);
    }
    x += 1;
  }
  console.log(possiveisClasses);
  possiveisClasses = itemsDesnecessarios(possiveisClasses);
  console.log(possiveisClasses);
  //   possiveisClasses = reverterOrdemClasses(possiveisClasses);
  //   possiveisClasses = acrescentaId(arr[0], possiveisClasses);
}
/* retirar os items desnecessarios, isto é items que só tem uma unica classe no 
   seletor. é irrelevante já que a função de classes ja faz isso.
   Talves adaptar para o evitaDuplicatas. a diferença entre as duas funçoes é que a evitaDuplicatas evita a 
   duplicata de regras e essa aqui evita a duplicata de seletores*/
function itemsDesnecessarios(arr) {
  arr = arr.join(" ").split(" ");
  const newArray = [];
  for (let seletor of arr) {
    if (
      seletor.split(".").length > 2 &&
      newArray.findIndex((elem) => elem == seletor) == -1
    ) {
      newArray.push(seletor);
    }
  }
  return newArray;
}
function reverterOrdemClasses(arr) {
  let arrayNovo = [...arr];
  var string = "";
  for (let seletor of arr) {
    let seletorArray = seletor.split(".");
    seletorArray = seletorArray.reverse();
    // dava problema com o join, pois colocava . no final dos seletores
    for (let seletorItem of seletorArray) {
      if (seletorItem) {
        string += "." + seletorItem;
      }
    }
    arrayNovo = [...arrayNovo, string];
    string = "";
  }
  // vai evitar duplicatas
  arrayNovo = itemsDesnecessarios(arrayNovo);
  console.log(arrayNovo);
  return arrayNovo;
}

function acrescentaId(id, arr) {
  let newArray = arr;
  for (let seletor of arr) {
    newArray = [...newArray, `${id}${seletor}`];
    console.log(seletor);
  }
  console.log(newArray);
  //   return arr;
}
concatenado();
