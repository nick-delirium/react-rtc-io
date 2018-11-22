class Chat {
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }
  getRoom(roomId) {
    const id = roomId;
    const room = this.rooms.filter(item => item.id === id)[0];
    return room;
  }
  updateRoom(room) {
    this.rooms = this.rooms.map(item => {
      if (item.id === room.id) {
        item = room;
        return item;
      }
    });
  }
  removeRoom(id) {
    this.rooms = this.rooms.filter(item => item.id !== id)
  }
}

module.exports = Chat;
