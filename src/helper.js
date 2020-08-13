//Obtenemos la diferencia de años

export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}
//Calcula el total a pagar según la marca

export function calculaMarca(marca) {
  let incremento;

  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;

    case "asiatico":
      incremento = 1.05;
      break;

    default:
      break;
  }
  return incremento;
}

//Calcula el total dependiendo del plan de seguro que contratemos

export function calculaPlan(plan) {
  return plan === "basico" ? 1.2 : 1.5;
}

//Las primera letra en mayúscula

export function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
