import DashboardManager from './DashboardManager';

//const dashboard = new DashboardManager(document.body, 'ws://localhost:7070');
const dashboard = new DashboardManager(document.body, 'ws://ahj89ws.herokuapp.com');

dashboard.init();