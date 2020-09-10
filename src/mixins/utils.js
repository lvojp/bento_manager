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
      }else{
        return -1;
      }
    },

    // OriginalMenusのコントローラー
    getOrgMenuIdxByTitle(menus, title){
      if(menus.length > 0){
        for(let i = 0; i < menus.length; i++){
          if(title === menus[i].title){
            return i;
          }
        }
      }
      // menusに指定のタイトルが存在しなければfalseを返す
      return -1;
    },

    checkDuplicateInOrgMenuByTitle(menus, title){
      let idx = 0;
      idx = this.getOrgMenuIdxByTitle(menus,title);
      if(idx !== -1){
        return true;
      }else{
        return false;
      }
    },

    deleteOrgMenuByTitle(menus, title){
      let idx = 0;
      idx = this.getOrgMenuIdxByTitle(menus,title);
      if(idx !== -1){
        menus.splice(idx, 1);
        return true;
      }else{
        return false;
      }
    },

    // updateMenus(menus, menu){
    updateOrgMenu(menus, menu){
      let idx = 0;
      idx = this.getOrgMenuIdxByTitle(menus,menu.title);
      if(idx !== -1){
        menus.splice(idx, 1, menu);
        return menus;
      }else{
        return {};
      }
    }
  }
}
