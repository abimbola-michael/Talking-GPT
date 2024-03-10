class Chat {
  constructor(id, name, message, time) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.time = time;
  }
  static fromMap(map) {
    return new Chat(map.id, map.name, map.message, map.time);
  }
  static toMap() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      time: this.time,
    };
  }
}
export default Chat;
