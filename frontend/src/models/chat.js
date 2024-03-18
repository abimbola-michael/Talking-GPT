//Do for this
class Chat {
  constructor(id, name, message, time, status) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.time = time;
    this.status = status;
  }
  static fromMap(map) {
    return new Chat(map.id, map.name, map.message, map.time, map.status);
  }
  static toMap() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      time: this.time,
      status: this.status,
    };
  }
}
export default Chat;
