class Category {
  constructor(id, name, time) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.chats = [];
  }
  static fromMap(map) {
    return new Category(map.id, map.name, map.time);
  }
  static toMap() {
    return {
      id: this.id,
      name: this.name,
      time: this.time,
    };
  }
}
export default Category;
