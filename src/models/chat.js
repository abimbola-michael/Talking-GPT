class Chat {
  constructor(id, name, message) {
    this.id = id;
    this.name = name;
    this.message = message;
  }
  static fromMap(map) {
    return new Chat(map.id, map.name, map.message);
  }
  static toMap() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
    };
  }
}
export default Chat;
