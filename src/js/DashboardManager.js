import Listener from './Listener';
import InstanceWidget from './InstanceWidget';
import WorklogWidget from './WorklogWidget';

export default class DashboardManager {
  constructor(container, url) {
    this.container = container;
    this.url = url;

    this.instanceManager = new InstanceWidget();
    this.worklog = new WorklogWidget();
    this.currentInstance = null;
  }

  init() {
    this.bindToDOM();
    this.initWSConnection();

    this.instanceManager.init(this.widgetsBoxEl);
    this.worklog.init(this.widgetsBoxEl);

    this.initElements();
    this.registerListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  createHTML() {
    return `
      <div class="dashboard-widget_box">
        <header class="chat-widget_header">
          <div class="dots">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
          </div>
          <h3 class="chat-widget_header_title">
            CloudDashboard v.1.0
          </h3>
        </header>
        
        <div class="dash-widgets_wrapper">           
        </div>

        <footer class="connection-status-box">
          <span class="connection-status-box_text">Connection status</span>
          <span class="connection-status-box_sign disconnected"></span>
        </footer>
      </div>  
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHTML());
    this.widgetsBoxEl = document.querySelector('.dash-widgets_wrapper');
  }

  initElements() {
    this.statusEl = document.querySelector('.connection-status-box');
    this.inctanceWidgetEl = document.querySelector('.widget-instance_box');
    this.inctanceBox = document.querySelector('.instances_tasks-box');
    this.worklogBox = document.querySelector('.worklog_tasks-box');
    this.inctanceEmptyBox = document.querySelector('.inctance-empty-box-content');
    this.worklogEmptyBox = document.querySelector('.worklog-empty-box-content');
  }

  initWSConnection() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'blob';
  }

  registerListeners() {
    this.ws.addEventListener('open', () => this.onWsOpen());
    this.ws.addEventListener('close', () => this.onWsClose());
    this.ws.addEventListener('message', (event) => this.onWsMessage(event));

    this.inctanceWidgetEl.addEventListener('click', (event) => this.onInctancesClick(event));
  }

  onInctancesClick(event) {
    if (event.target.classList.contains('instance-footer')) {
      Listener.onInstanceCreateClick.call(this);
      return;
    }

    this.currentInstance = event.target.closest('.instance-task_box');

    if (event.target.classList.contains('instance-task-actions_switch')) {
      Listener.onInstanceSwitch.call(this);
      return;
    }

    if (event.target.classList.contains('instance-task-actions_delete')) {
      Listener.onInstanceDel.call(this);
    }
  }

  onWsOpen() {
    Listener.onWsOpen.call(this);
  }

  onWsClose() {
    Listener.onWsClose.call(this);
  }

  onWsMessage(event) {
    Listener.onWsMessage.call(this, event);
  }

  // eslint-disable-next-line class-methods-use-this
  switchInctanceStatus(task) {
    const statusText = task.querySelector('.instance-task-status_text');
    const btn = task.querySelector('.instance-task-actions_switch');

    // eslint-disable-next-line no-param-reassign
    task.dataset.state = task.dataset.state === 'stopped' ? 'running' : 'stopped';
    statusText.textContent = statusText.textContent === 'stopped' ? 'running' : 'stopped';

    btn.classList.toggle('stopped');
    btn.classList.toggle('running');
  }
}
