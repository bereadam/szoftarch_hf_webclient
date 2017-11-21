export class Category {

  id: number;
  name: string;
  parent: number;
  subcategories: Array<number> = Array<number>();
  pois: Array<number> = Array<number>();

  constructor(
    id = null,
    name = null,
    parent = null,
    subcategories = null,
    pois = null
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.subcategories = subcategories;
    this.pois = pois;
  }

}
