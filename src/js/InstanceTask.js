export default class InstanceTask {
  constructor(container, { id, state }) {
    this.container = container;
    this.id = id;
    this.state = state;
  }

  init() {
    this.bindToDOM();
  }

  createHTML() {
    return `
      <div class="instance-task_box" data-id=${this.id} data-state=${this.state}>
        <header class="instance-task-header">${this.id}</header>
        <section class="instance-task-status">
          <span class="instance-task-status_title">Status: </span>
          <span class="instance-task-status_circle"></span>
          <span class="instance-task-status_text">${this.state}</span>
        </section>
        <section class="instance-task-actions">
          <span class="instance-task-actions_title">Actions: </span>
          <span class="instance-task-actions_switch stopped"></span>
          <span class="instance-task-actions_delete"></span>
        </section>
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
