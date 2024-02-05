export interface User{
    id?: number,
    userName: string,
    email: string,
    password: string //seria un fallo de seguiradad no ponerlo asi porque si no habria que guardarlo en localStorage
}