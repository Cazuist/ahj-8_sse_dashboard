import InstanceTask from './InstanceTask';
import WorklogTask from './WorklogTask';

export default class Listeners {
  static onWsOpen() {
    const conEl = this.statusEl.children[1];
    conEl.classList.remove('disconnected');

    this.ws.send(JSON.stringify({ method: 'loadInstances' }));
  }

  static onWsClose() {
    const conEl = this.statusEl.children[1];
    conEl.classList.add('disconnected');
    this.ws.close();
  }

  static onInstanceCreateClick() {
    this.ws.send(JSON.stringify({ method: 'createRequest' }));
  }

  static onInstanceSwitch() {
    const { id } = this.currentInstance.dataset;
    const { state } = this.currentInstance.dataset;
    const data = { id, state };
    this.ws.send(JSON.stringify({ method: 'switchRequest', data }));
  }

  static onInstanceDel() {
    const { id } = this.currentInstance.dataset;
    const data = { id };
    this.ws.send(JSON.stringify({ method: 'deleteRequest', data }));
  }

  static onWsMessage(event) {
    const response = JSON.parse(event.data);
    const {
      method, data,
    } = response;

    if (method === 'loadInstances') {
      if (!data.length) return;

      this.inctanceEmptyBox.classList.add('hidden');

      data.forEach((instance) => {
        const instanceTask = new InstanceTask(this.inctanceBox, instance);
        instanceTask.init();
      });

      return;
    }

    this.worklogEmptyBox.classList.add('hidden');
    const worklogTask = new WorklogTask(this.worklogBox, response, data.id);
    worklogTask.init();

    if (method === 'createResponse') {
      const instanceTask = new InstanceTask(this.inctanceBox, data);
      instanceTask.init();
      return;
    }

    if (method === 'switchResponse') {
      this.switchInctanceStatus(this.currentInstance);
      return;
    }

    if (method === 'deleteResponse') {
      this.currentInstance.remove();
      this.currentInstance = null;
      this.inctanceEmptyBox.classList.remove('hidden');
    }
  }
}
