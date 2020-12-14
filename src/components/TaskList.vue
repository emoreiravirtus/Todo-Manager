<template>
  <div class="task">
    <div class="row center" v-if="tasks.length == 0"> You don't have tasks</div>
    <div class="row">
      <div v-for="(task, index) in tasks" :key="index">
        <task :task="task"></task>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task";
export default {
  name: "TaskList",
  components: {
    Task,
  },
  computed:{
    tasks(){
      return this.$store.getters["task/tasks"]
    }
  }
};
</script>

<style>
</style>