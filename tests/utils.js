export function createDoc(str) {
  const doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = str;
  return doc;
}

export function createPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

export const sleep = n => new Promise(res => setTimeout(res, n));
