<script>
  import { onMount } from 'svelte';
  import TaskForm from './components/TaskForm.svelte'
  import taskStore from './stores/task.js'

  $: tasks = $taskStore.tasks;
  $: editTask = $taskStore.editTask;
  $: activeFilter = $taskStore.activeFilter;
  $: emptyTask = $taskStore.emptyTask;
  let filteredTasks;
  let isLoading = true;

  $: if (activeFilter === "todo") {
       filteredTasks = tasks.filter(task => !task.done)
     } else if (activeFilter === "done") {
       filteredTasks = tasks.filter(task => task.done)
     }

  onMount(async () => {
    await taskStore.getTasks();
    isLoading = false;
  })

  $: isInEditMode = (id) => {
    return editTask && editTask.id === id
  }

</script>

<main>
  <h1>TODO LIST</h1>
  <div class="container">
    <div id="filter-options">
      <button class="text-btn" on:click={() => taskStore.filterTasks("todo")}>Todo</button>
      <button class="text-btn" on:click={() => taskStore.filterTasks("done")}>Done</button>
    </div>
      {#if isLoading}
        Loading tasks...
      {:else}
        {#if !filteredTasks.length}
          There is no task here.
        {/if}
        <div id="todo-list">
          <ul>
            {#if activeFilter === "todo"}
              <li class="new-task">
                <TaskForm task={emptyTask} />
              </li>
            {/if}
            {#each filteredTasks as task (task.id)}
            <li class="task">
              {#if isInEditMode(task.id)}
                <TaskForm task={editTask} />
              {:else}
                <input type="checkbox" checked={task.done} name="done" on:change={() => taskStore.toggleDoneStatus(task)}>
                <p>{task.title}</p>
                <button on:click={() => taskStore.enableEdit(task)} class="icon-btn"><i class="fas fa-pencil-alt"></i></button>
                <button on:click={() => taskStore.deleteTask(task)} class="icon-btn"><i class="fas fa-trash"></i></button>
              {/if}
            </li>
            {/each}
          </ul>
        </div>
      {/if}
  </div>
</main>

<style lang="scss">
  main {
    margin: 5rem auto;
    max-width: 50%;
  }

  h1 {
    color: #fff;
    text-shadow: 1px 1px 1px #0006;
  }

  .container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #00000038 0 0 20px;
    padding: 2rem;
  }

  #filter-options {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #640e95, #89c7f47a) 1;
  }

  #todo-list {
    width: 60%;
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    text-align: left;
    padding: 1rem 0;

    &.task {
      border-top: 1px solid;
      border-image: linear-gradient(to right, #640e955c, #89c7f47a) 30;

      &:last-child {
        border-bottom: 1px solid;
      }
    }

    &:hover {
      .icon-btn {
        display: inline;
      }
    }
  }

  p {
    font-family: 'Delius', 'Quicksand', sans-serif;
    margin: 0;
    margin-left: 20px;
    font-size: 18px;
    flex-grow: 3;
  }

  .icon-btn {
    color: #645577;
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: none;

    &:hover {
    color: #514366;
    }
  }

  @media (max-width: 567.98px) {
    li {
      justify-content: center;
    }
  }

  @media (max-width: 991.98px) {
    main {
      min-width: 100%;
    }

    .container {
      border-radius: 0;
    }

    #todo-list {
      width: 80%;
    }

    h1 {
      padding-left: 2rem;
    }
  }

  @media (max-width: 1199.98px) {
    main {
      max-width: 80%;
    }
  }
</style>
