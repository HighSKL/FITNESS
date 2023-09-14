class ApiError {
    UserNotAuthorized(){
        return {status: 401, message: "User not authorized"}
    }
    EmailAlreadyExists(){
        return {status: 409, message: "This email already exists"}
    }
}

export default new ApiError();