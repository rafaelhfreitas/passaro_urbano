import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    transform(text: string, truncateLenght: number, startPosition:number ): string {
        if(text.length > truncateLenght) {
            return text.substr(startPosition,truncateLenght) + '...';
        } 
        
        return text
    }

}