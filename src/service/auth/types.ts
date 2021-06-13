
export abstract class IAuth {
    abstract signIn(username: string, password: string) : Promise<string>
}