/* eslint-disable prettier/prettier */
export enum UserType{
    USER="USER",
    DESIGNER="DESIGNER",
    BILLERS="BILLERS",
    ADMIN="ADMIN",
}

export const userTypeList = Object.values(UserType)

export enum Gender{
    MALE="MALE",
    FEMALE="FEMALE",
}

export enum DesignerRole{
    DESIGNER="DESIGNER",
    SUPER_DESIGNER="SUPER_DESIGNER",
    SUPERVISOR="SUPERVISOR"
}
export enum DesignerRanks{
   JUNIOR="JUNIOR",
   MID="MID",
   SENIOR="SENIOR",
}
export enum AdminRole{
    ADMIN="ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    HR = "HR",
    ACCOUNTANT = "ACCOUNTANT"
}