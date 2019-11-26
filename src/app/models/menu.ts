export class Menu {
  id: number;
  title: string;
  submenu: SubMenuItem[];
}

export class SubMenuItem {
  title: string;
  url: string;
}
