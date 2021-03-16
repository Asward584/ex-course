export class Page {
    constructor(params){
        this.params = params;
    }
    getRoot() {
        throw new Error('Method "getRoot" sould be implemented')
    }

    afterRender(){}

    destroy(){}

}