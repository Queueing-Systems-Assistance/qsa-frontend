export class MathContent{
    private content: string;

    constructor(content: string){
        this.content = content;
    }

    getContent(): string{
        return this.content;
    }
}