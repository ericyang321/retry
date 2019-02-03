export type Callee = Function | Promise<any>;

/*
  step 1: make it work with Promise
*/

class Trier {
  constructor() {}
}

function trytrytry() {
  const defaultSettings = {};
}

/*
  trytrytry(settings, new Promise((resolve, reject) => {

  }))

  trytrytry(settings, () => {

  })
*/

export default trytrytry;
