import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory('/todos'),
  routes: [
    { path: '/', component: { template: '<div>Todo Home</div>' } },
    { path: '/new', component: { template: '<div>Add new todo</div>' } },
  ],
});
