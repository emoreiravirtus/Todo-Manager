<template>
  <div class="col s12 m4">
    <modal name="editmodal">
      <div class="row hide-on-small-only">
        <a @click="closeModal" class="btn waves-effect pink"
          ><i class="material-icons">arrow_back_ios</i></a
        >
      </div>
      <div class="row">
        <form class="col s12">
          id# {{ slug }}
          <div class="row">
            <div class="input-field col s12">
              
              <label>Task name</label>
              <input type="text" v-model="task.name" />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              
              <label>Description(optional)</label>
              <input type="text" v-model="task.description" />
            </div>
          </div>
          <div class="row">
            <datepicker
              :disabled-dates="disabledDates"
              :inline="true"
              v-model="task.deadline"
            ></datepicker>
          </div>
          <div class="row u-center-text">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
          </div>
          <div class="row center">
            <a @click="updateTask" class="btn waves-effect green">Update</a>
            <a @click="closeModal" class="btn waves-effect red">Cancel</a>
          </div>
        </form>
      </div>
    </modal>

    <div class="card">
      <span class="card-title center">{{ task.name }}</span>
      <div class="card-content">
        <div class="fixed-action-btn horizontal">
          <a class="btn-floating btn-large pink">
            <i class="large material-icons">settings</i>
          </a>
          <ul>
            <li>
              <a @click="Delete" class="btn-floating red"
                ><i class="material-icons">delete</i></a
              >
            </li>
            <li>
              <a @click="showEditModal" class="btn-floating yellow darken-1"
                ><i class="material-icons">create</i></a
              >
            </li>
          </ul>
        </div>
        <p><strong>Deadline</strong> {{ task.deadline | formatDate }}</p>
        <p v-if="task.description">
          <strong>Description:</strong> {{ task.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
export default {
  name: "Task",
  props: ["task"],
  data(){
    return {
      feedback: null,
      disabledDates: {
        to: new Date(),
      },
    }
  },
  components:{
    Datepicker
  },
  computed: {
    slug() {
      if (this.task.name) {
        var slug = this.sanitizeTitle(this.task.name);
        return slug;
      }
      return ""
    },
  },
  methods:{
    updateTask(){
      let loader = this.$loading.show({
          color: "#ec407a",
          loader: "spinner",
    });
    setTimeout(async () => {
        await this.$store.dispatch("task/updateTask", this.task)
        .catch((err) => {
          this.feedback = err
        })
       loader.hide()
       this.closeModal()
    }, 500)
    },
    closeModal() {
      this.$modal.hide("editmodal");
    },
      Delete(){
          this.$store.dispatch("task/deleteTask", this.task)
      },
      showEditModal(){
          this.$modal.show('editmodal')
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
  }
};
</script>
<style>
.fixed-action-btn {
  position: absolute;
  bottom: -2rem;
}
</style>