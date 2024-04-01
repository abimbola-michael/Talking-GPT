//Do for this
class Category {
  constructor(id, name, date, chats = []) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.chats = chats;
  }
  // static fromMap(map) {
  //   return new Category(map.id, map.name, map.time);
  // }
  // static toMap() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     time: this.time,
  //   };
  // }
}
export default Category;
