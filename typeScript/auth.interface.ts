// export interface IloginProps {
//     email: string,
//     password: string,
//     token: string,
//     message: string,
//     status: number;
//     data:object ;
//     profile_pic: string;
// }
export interface IUserData {
    profile_pic: string; // Define profile_pic inside a user data object
    [key: string]: any;  // Allow other dynamic properties
  }
  
  export interface IloginProps {
    email: string;
    password: string;
    token: string;
    message: string;
    status: number;
    data: IUserData;  // Make data follow the IUserData structure
  }
  
export interface IregisterProps {
    first_name: string,
    last_name:string,
    email: string,
    password: string,
    profile_pic: string,
    token: string,
    message: string,
    status: number
}
export interface loginProps extends IloginProps {
    user: IloginProps
}

export interface registerProps extends IregisterProps {
    user: IregisterProps
}