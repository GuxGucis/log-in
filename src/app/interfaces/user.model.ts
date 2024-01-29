export interface User{
    id: number,
    userName: string,
    active: number,
    password?: string //seria un fallo de seguiradad no ponerlo asi porque si no habria que guardarlo en localStorage y no
}