export type IAuthState = {
    ACCESS_TOKEN: string
}

type IRootState = {
    auth: IAuthState;
};
  
export default IRootState;