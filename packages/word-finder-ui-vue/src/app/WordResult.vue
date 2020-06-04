<template>
    <div class="results">
        <p>String '<span class="string">{{formResult.word.textString}}</span>'
            <span v-if="formResult.word.existsInDictionary">exists</span>
            <span v-else>does not exist</span>
            in {{formResult.selectedLanguage}} dictionary.
        </p>
        <p v-if="wordHasAnagrams()"> Anagrams: {{anagrams()}}</p>
        <p v-else>No anagrams found.</p>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Result} from "./result";

    @Component
    export default class WordResult extends Vue {
        @Prop() private formResult!: Result;

        anagrams(): string {
            return this.formResult.word.dictionaryAnagrams.join(', ');
        }

        wordHasAnagrams(): boolean {
            return this.formResult.word.dictionaryAnagrams?.length > 0;
        }
    }
</script>
