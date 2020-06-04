import axios from 'axios';
import {Word} from '@/app/word.dto';

export class WordClient {

    async getDictionaryLanguages(): Promise<any> {
        return await axios.get('http://localhost:8080/dictionary-languages/')
    }

    async getWord(language: string, textString: string): Promise<Word> {
        return await axios.get(`http://localhost:8080/words/${language}:${textString}`)
    }

}