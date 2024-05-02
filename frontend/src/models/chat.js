//Do for this
class Chat {
  constructor(id, prompt, response, time, status) {
    this.id = id;
    this.prompt = prompt;
    this.response = response;
    this.time = time;
    this.status = status;
  }
  // static fromMap(map) {
  //   return new Chat(map.id, map.name, map.message, map.time, map.status);
  // }
  // static toMap() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     message: this.message,
  //     time: this.time,
  //     status: this.status,
  //   };
  // }
}
export default Chat;
