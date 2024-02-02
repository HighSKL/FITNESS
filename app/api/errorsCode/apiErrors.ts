import { ErrorResponesType } from "@/app/types"

class ApiError {
    UserNotAuthorized(){
        return {status: 401, message: "User not authorized"}
    }
    EmailAlreadyExists(){
        return {status: 409, message: "This email already exists"}
    }
    UnexpectedError(){
        return {status: 500, message:"Unexpected error"}
    }
    UserNotFound(){
        return {status: 401, message: "User not found"}
    }
    InvalidPassword(){
        return {status: 403, message: "Invalid password"}
    }
    ExternalError(errorMessage: string){
        return {status: 500, message: errorMessage}
    }
}

export default new ApiError();