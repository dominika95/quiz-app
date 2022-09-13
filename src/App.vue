<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/question">Question</router-link>
    <router-link to="/result">Result</router-link>
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
  background: linear-gradient(110deg, #0B2545 20%, #13315C 80%);
}

      html, body {
        height: 100%;
        margin: 0;
        padding: 10;
      }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
