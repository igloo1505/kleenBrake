class ErrorHandler {
    status: number = 500
    msg: string
    constructor(status: number, msg: string) {
        this.status = status
        this.msg = msg
    }
}

export default ErrorHandler
