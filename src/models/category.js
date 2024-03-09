class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static fromMap(map) {
    return new Category(map.id, map.name);
  }
  static toMap() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
export default Category;
