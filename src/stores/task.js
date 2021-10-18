import { writable } from "svelte/store";

const baseURL = "https://todo-list-api-fmdev.herokuapp.com/tasks";

const store = () => {
  const state = {
    tasks: [],
    editTask: null,
    emptyTask: {id: null, title: null},
    activeFilter: "todo",
  };

  const { subscribe, set, update } = writable(state);

  const methods = {
    async getTasks() {
      const response = await fetch(baseURL);
      let tasks = await response.json();
      const result = tasks.sort((a, b) => a.id - b.id);
      update((state) => {
        state.tasks = result;
        return state;
      });
      this.resetTask();
    },
    async createOrUpdateTask(task) {
      await fetch(`${baseURL}${task.id ? `/${task.id}` : ''}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      });
      this.getTasks();
    },
    async deleteTask(task) {
      await fetch(`${baseURL}/${task.id}`, {
        method: "delete"
      });
      this.getTasks();
    },
    resetTask() {
      update((state) => {
        state.editTask = null;
        state.emptyTask = {id: null, title: null};

        return state;
      });
    },
    enableEdit(task) {
      update((state) => {
        state.editTask = {...task};
        return state;
      });
    },
    filterTasks(filter) {
      update((state) => {
        state.activeFilter = filter;
        return state;
      });
    },
    async toggleDoneStatus(task) {
      task.done = !task.done;
      this.createOrUpdateTask(task);
    },
  }

  return {
    subscribe,
    set,
    update,
    ...methods
  };
};

export default store();
