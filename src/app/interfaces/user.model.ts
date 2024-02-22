export interface User{
    id?: number,
    userName: string,
    email: string,
    phone: string,
    name: string,
    surname: string,
    gender: string,
    password: string, //seria un fallo de seguiradad no ponerlo asi porque si no habria que guardarlo en localStorage
    country: string,
    ccaa?: string,
    provincia?: string
}