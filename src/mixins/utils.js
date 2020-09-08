export default {
  methods: {
    backToTop() {
      this.$router.push({
        name: 'home'
      })
    },
    objectCopy(obj) {
      let json = JSON.stringify(obj);
      return JSON.parse(json);
    },
    saveToLocalStorage(obj, key) {
      const parsed = JSON.stringify(obj);
      localStorage.setItem(key, parsed);
    },
    loadFromLocalStorage(key) {
      if (localStorage.getItem(key)) {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    }
  }
}
