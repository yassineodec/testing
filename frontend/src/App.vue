<template>
  <header-nav />
  <div>
    <router-view />
  </div>
</template>
<script>
import headerNav from "./components/headerNav.vue";
import footerBar from "./components/footerBar.vue";
export default {
  components: {
    headerNav,
    footerBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300;400;500;600;700&display=swap");

#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(229, 231, 235, 255);
  min-height: 100vh;
  //   text-align: center;
  //   color: #2c3e50;
}
</style>
