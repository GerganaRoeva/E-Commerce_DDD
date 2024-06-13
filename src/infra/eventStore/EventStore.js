class EventStore {
  constructor() {
    this.events = [];
  }

  async saveEvent(event) {
    this.events.push(event);
  }

  async getEvents() {
    return this.events;
  }
}

export default EventStore;
