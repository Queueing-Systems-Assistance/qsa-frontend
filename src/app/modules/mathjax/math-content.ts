export class MathContent{
    private content: string;

    constructor(content?: string){
        this.content = content ? content: "";
    }

    public getContent(): string{
        return this.content;
    }

    public clear(){
        this.content = "";
    }

    public append(str: string){
        this.content = this.content.concat(str);
    }
}