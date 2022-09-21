<template>
  <nav>
    <router-link to="/">Start new quiz</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #EEF4ED;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-image: url(./assets/306540187_770889500634300_7350872674608355167_n.png);
}

html, body {
  height: 100%;
  margin: 0;
  padding: 10;
  background: #efe4b0;
}

nav {
  margin: 30px;
  background: #efe4b0;
  opacity: 0.7;
  box-shadow: 0px 10px 5px #efe4b0;

  a {
    color: #0b2545;
    text-decoration: none;
    float: right;

    &.router-link-exact-active {
      color: #0b2545;
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>
