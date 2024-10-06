class  ApiRespone {
    constructor(
        statuscode,
        message,
        data
    ){
        this.statuscode = statuscode < 400;
        this.message = message;
        this.data = data;
    }
}


export  default ApiRespone