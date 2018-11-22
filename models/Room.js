class Room {
  constructor(id) {
    this.id = id;
    this.userPool = [];
  }
  addUser(name) {
    this.userPool.push(name);
  }
  removeUser(name) {
    this.userPool = this.userPool.filter(item => item !== name);
  }
  getPool() {
    return this.userPool;
  }
  getId() {
    return this.id;
  }
}

module.exports = Room;
