export class Task {
  constructor(id, task, notes, status) {
    this.id = id;
    this.task = task;
    this.notes = notes;
    this.status = status;
  }
  // Formatierter Status
  get statusForm() {
    return this.status === false ? "offen" : "erledigt";
  }
}
