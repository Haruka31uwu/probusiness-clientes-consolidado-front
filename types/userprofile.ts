export interface UserProfile{
    id:number,
    fullName:string,
    photoUrl:string,
    email:string,
    documentNumber:string,
    age:number,
    country:string,
    city?:string,
    phone?:string,
    business?:UserBusiness,   
    importedAmount:number,
    importedContainers:number,
    goals?:string, 
}
export interface UserBusiness{
    id:number,
    name:string,
    ruc:string,
    comercialCapacity:string,
    rubric:string,
    socialAddress?:string,
}