export interface IList {
  id: string;
  name: string;
  items: IListItem[];
}

export interface IListItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}
