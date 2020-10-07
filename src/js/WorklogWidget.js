export default class InstanceWidget {
  init(container) {
    this.bindToDOM(container);
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <div class="widget widget-worklog_box">
        <header class="widget-title">Worklog:</header>
        <section class="widget_tasks-box worklog_tasks-box">
          <div class="worklog-empty-box-content">
            No activity yet
          </div> 
        </section>
      </div>
    `;
  }

  bindToDOM(container) {
    container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
