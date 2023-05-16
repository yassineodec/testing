import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router";
export default createStore({
  state: {
    hasToken:
      !window.sessionStorage.getItem("access_token") == "" ? true : false,
    user: "",
    postData: [],
  },
  getters: {},
  mutations: {
    loggedOut(state) {
      state.hasToken = false;
      state.user = "";
    },
  },
  actions: {
    logOut({ commit }) {
      let token = window.sessionStorage.getItem("access_token");
      axios
        .get("http://192.168.1.70:10520/api/user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.message == "Session cerrada") {
            window.sessionStorage.removeItem("access_token");
            console.log(res.data.message);
            commit("loggedOut");
            router.push({ name: "home" });
          }
        })
        .catch((error) => {
          // let eerror = error.response.data.message;
          console.log(error);
        });
    },
  },
  modules: {},
});
