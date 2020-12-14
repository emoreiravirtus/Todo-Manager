<template>
  <div class="home container">
    <a @click="Logout" class="btn waves-effect pink show-on-small"
      ><i class="material-icons">exit_to_app</i> Logout</a
    >
    <a @click="showAddModal" class="btn waves-effect pink"
      ><i class="material-icons">add</i> Add task</a>
    <modal name="addmodal">
      <div class="row">
        <a @click="closeModal" class="btn waves-effect pink"
          ><i class="material-icons">arrow_back_ios</i></a
        >
      </div>
      <div class="row">
        <form class="col s12">
          id# {{ slug }}
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="major_task.name" />
              <label>Task name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="major_task.description" />
              <label>Description(optional)</label>
            </div>
          </div>
          <div class="row">
            <datepicker
              :disabled-dates="disabledDates"
              :inline="true"
              v-model="major_task.deadline"
            ></datepicker>
          </div>
          <div class="row u-center-text">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
          </div>
          <div class="row center">
            <a @click="addTask" class="btn waves-effect green">Add task</a>
            <a @click="closeModal" class="btn waves-effect red">Cancel</a>
          </div>
        </form>
      </div>
    </modal>

    <div class="row">
      <div class="card">
        <div class="card-content">
          <task-list></task-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
import Datepicker from "vuejs-datepicker";

export default {
  components: { TaskList, Datepicker },
  name: "Home",
  data() {
    return {
      major_task: {
        name: null,
        description: null,
        deadline: null,
      },
      feedback: null,
      disabledDates: {
        to: new Date(),
      },
    };
  },
  methods: {
    async Logout() {
      await this.$store
        .dispatch("user/logout", this.user)
        .then(this.$router.push({ name: "Login" }));
    },
    showAddModal() {
      this.$modal.show("addmodal");
    },
    closeModal() {
      this.mobile_editing = false
      this.$modal.hide("addmodal");
    },
    async addTask() {
      if (this.major_task.name && this.major_task.deadline) {
        this.feedback = null;
        let task = this.major_task;
        task.id = this.slug;
        let loader = this.$loading.show({
          color: "#ec407a",
          loader: "spinner",
        });
        await this.$store.dispatch("task/sendTask", task).then(() => {
          loader.hide();
          this.$modal.hide("addmodal");
        });
      } else {
        this.feedback = "Please fill all required fields";
      }
    },
    sanitizeTitle: function (title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "d"
      slug = slug.replace(/đ/gi, "d");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      return slug;
    },
  },
  computed: {
    slug() {
      if (this.major_task.name) {
        var slug = this.sanitizeTitle(this.major_task.name);
        return slug;
      }
      return "";
    },
  },
  mounted() {
    let loader = this.$loading.show({
      color: "#ec407a",
      loader: "spinner",
    });
    setTimeout(() => {
      this.$store.dispatch("task/startListen");
      loader.hide();
    }, 1000);
  },
};
</script>

<style>
.vm--modal {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 3rem;
}
</style>
