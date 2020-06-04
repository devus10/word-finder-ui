<template>
  <div id="app">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="headers">
            <h1 class="title">
              Word finder
            </h1>
            <h2 class="subtitle">
              Find your string in selected dictionary
            </h2>
          </div>
          <WordResult v-bind:form-result="result"></WordResult>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          &copy; Pakisoft 2020
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./app/HelloWorld.vue";
import WordResult from './app/WordResult.vue';
import {Result} from './app/result';

@Component({
  components: {
    HelloWorld,
    WordResult
  }
})
export default class App extends Vue {
  private result =  new Result({
            textString: 'word',
            existsInDictionary: true,
            dictionaryAnagrams: ['word', 'rowd']
          }, 'Polish'
  );
}
</script>

<style lang="sass" src='bulma/bulma.sass'></style>
<style lang="scss" src='../../../styles.scss'></style>
<!--<style lang="scss">-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 60px;-->
<!--}-->
<!--</style>-->
