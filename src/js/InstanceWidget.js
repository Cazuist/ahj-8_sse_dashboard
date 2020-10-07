export default class InstanceWidget {
  init(container) {
    this.bindToDOM(container);
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <div class="widget widget-instance_box">
        <header class="widget-title">Your microinstances:</header>
        
        <section class="widget_tasks-box instances_tasks-box">
          <div class="inctance-empty-box-content">
            No opened instances yet
          </div>           
        </section>

        <footer class="widget-footer instance-footer">Create new instance</footer>
      </div>
    `;
  }

  bindToDOM(container) {
    container.insertAdjacentHTML('beforeend', this.createHTML());
  }
}
