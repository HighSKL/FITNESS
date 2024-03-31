export default class ApiError extends Error {

    status: number = 0
    message: string = ''

    constructor(status: number, message: string){
        super()
        this.status = status
        this.message = message
    }

    static UserNotAuthorized(){
        return new ApiError(401, "Пользователь не авторизован")
    }
    static EmailAlreadyExists(){
        return new ApiError(409, "Пользователь с заданным email уже существует")
    }
    static UnexpectedError(){
        return new ApiError(500, "Непредвиденная ошибка")
    }
    static UserNotFound(){
        return new ApiError(401, "Пользователь не найден")
    }
    static InvalidPassword(){
        return new ApiError(403, "Неправильный пароль")
    }
    static ExternalError(errorMessage: string){
        return new ApiError(500, errorMessage)
    }
}

