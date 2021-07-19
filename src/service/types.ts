export type ApiResponseType<Data> = {
    statusCode: number,
    data: Data,
    message: string
}