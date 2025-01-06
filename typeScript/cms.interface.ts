export interface IallListProps {
  // token: string,
  message: string;
  status: number;
}

export interface listProps extends IallListProps {
  user: IallListProps;
}
