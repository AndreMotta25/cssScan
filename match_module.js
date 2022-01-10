import Match from "./api_match.js";

/**
 * Vai iniciar o objeto match e habilitar todos os filhos de body para serem acessados
 * pelo objeto match
 *
 * */
function init() {
  const match = new Match();
  const elementosHtml = document.querySelectorAll(`body *`);
  elementosHtml.forEach((elem) => {
    elem.addEventListener(`click`, (e) => {
      e.stopPropagation();
      match.findRules(elem);
    });
  });
  // match.target(document.querySelector(`.btn`));
  // match.insertRule("font-size", "30px");
  match.insertRule(`.btn {font-size:30px;}`);
}

init();
