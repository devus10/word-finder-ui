import {Word} from './word.dto';

export class Result {
    word: Word;
    selectedLanguage: string;

    constructor(word: Word, selectedLanguage: string) {
        this.word = word;
        this.selectedLanguage = selectedLanguage;
    }
}