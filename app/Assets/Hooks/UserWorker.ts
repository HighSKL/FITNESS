import useUserUpdate from "./useUserUpdate"

export default class UserWorker {
    public async updateUser(){
        const { isLoading } = useUserUpdate()
    }
}

