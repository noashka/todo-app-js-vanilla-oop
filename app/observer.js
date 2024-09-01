export const observer = {
  observers: new Set(),
  addObserver(obs) {
    this.observers.add(obs);
  },

  removeObserver(obs) {
    this.observers.remove(obs);
  },

  notify() {
    this.observers.forEach((obs) => obs());
  },
};
