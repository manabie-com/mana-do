import { AuthForm } from "src/redux/types"

export const loginAPI = async (data: AuthForm): Promise<string | undefined> => {
    try {
        if (data.userId === "firstUser" && data.password === "example") {
            return "DEMOTOKENFORAUTHENTICATION"
        }
        throw new Error("Invalid userId or password")
    } catch (err) {
        console.log(err)
    }
}