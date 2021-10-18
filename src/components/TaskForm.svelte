<script>
  import taskStore from './../stores/task.js'
  export let task;
</script>

<form class={task.id ? "edit-task-form" : "new-task-form"} on:submit|preventDefault={() => taskStore.createOrUpdateTask(task)}>
  <input type="text" bind:value={task.title} name="title" autofocus>
  {#if task.id}
    <div class="options-buttons">
      <button type="submit" class="text-btn"><i class="fas fa-check"></i></button>
      <button on:click={taskStore.resetTask} class="text-btn"><i class="fas fa-times"></i></button>
    </div>
  {:else}
    <input type="submit" value="Add" class="btn-primary">
  {/if}
</form>

<style lang="scss">
  form {
    display: flex;

    .options-buttons {
      display: flex;
      align-items: center;

      button {
        margin-left: 10px;
      }
    }

    input[type="text"] {
      font-family: 'Delius', 'Quicksand', sans-serif;
      border: 1px solid #6c509582;
      border-radius: 6px;
      font-size: 18px;
      padding: 5px;
      margin-left: 35px;
      margin-right: 10px;
    }
  }

  .btn-primary {
    padding: 0.5rem 0.75rem;
    color: #fff;
    border: 1px solid #645577;
    border-radius: 6px;
    background-color: #645577;

    &:hover {
      background-color: #514366;
      border-color: #514366;
      cursor: pointer;
    }
  }

  @media (max-width: 567.98px) {
    form {
      flex-direction: column;
      align-items: center;

      input[type="text"] {
        margin: 0 0 10px 0;
      }
    }
  }
</style>
