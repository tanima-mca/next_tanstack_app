export interface IallListProps {
  //  token: string,
  _id: string;
  title: string;
  description: string;
  image: string;
  status: number;
  data: string;
}

export interface listProps extends IallListProps {
  user: IallListProps;
}

export interface IcreateProps {
  token: string;
  message: string;
  status: number;
  title: string;
  description: string;
  image: string;
  user?: Record<string, any>;
}

export interface createProps extends IcreateProps {
  user: IcreateProps;
}


export interface IdeleteProps {
  id: string;
   token: string;
  message: string;
  status: number;
  title: string;
  description: string;
}

export interface deleteProps extends IdeleteProps {
    user: IdeleteProps;
    status: number;
    token: string;
  }