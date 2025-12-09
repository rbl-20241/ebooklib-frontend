export interface BookTree {
  label: string;
  data: string;
  expandedIcon : string;
  collapsedIcon: string;
  icon: string;
  children: BookTree[];
}
