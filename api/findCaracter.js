function findCaracter(caracter, texto) {
  let count = 0;
  let totRepeat = [];
  let pos;

  while (pos != -1) {
    count++;
    pos = texto.indexOf(caracter, pos + 1 /* o mesmo que 3 + 1 */);
    if (pos != -1) {
      totRepeat.push(pos);
    }
  }
  return totRepeat.length;
}

export default findCaracter;
