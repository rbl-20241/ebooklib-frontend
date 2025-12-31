export interface BookTree {
  key: string;
  label: string;
  data: string;
  expandedIcon : string;
  collapsedIcon: string;
  icon: string;
  children: BookTree[];
  selectable: boolean;
}
