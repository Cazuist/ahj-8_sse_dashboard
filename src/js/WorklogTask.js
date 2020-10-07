import moment from 'moment';

export default class InstanceTask {
  constructor(container, { text }, id) {
    this.container = container;
    this.id = id;
    this.text = text;
    this.date = moment().format('hh:mm:ss DD.MM.HH');
  }

  init() {
    this.bindToDOM();
  }

  createHTML() {
    return `
      <div class="worklog-task_box">
        <header class="worklog-task-header">${this.date}</header>
        <section class="worklog-task-server">
          <span class="worklog-task-server_title">Server: </span>
          <span class="worklog-task-server_id">${this.id}</span>
        </section>
        <section class="worklog-task-info">
          <span class="worklog-task-info_title">INFO: </span>
          <span class="worklog-task-info_text">${this.text}</span>
        </section>
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
