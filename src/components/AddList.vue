<template>
  <div class="add-list">
    <input v-if="isAddList" type="text" class="form-control" v-model="inputTitle"
           ref="inputTitle" @blur="restore" @keyup.enter="onSubmit">
    <a v-else href="" @click.prevent="onAddList">&times;Add List</a>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AddList",
  data() {
    return {
      isAddList: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState([
      'board'
    ])
  },
  methods: {
    ...mapActions(['ADD_LIST']),
    onAddList() {
      this.isAddList = !this.isAddList
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onSubmit() {
      if (!this.inputTitle) {
        return
      }

      this.board.lists.forEach(li => {
        this.inputTitle = this.inputTitle.trim()
        if(!this.inputTitle) return this.restore()

        if(li.title === this.inputTitle){
          if (window.confirm(this.board.lists.length)) return
        }
      })
      const title = this.inputTitle
      const lastList = this.board.lists[this.board.lists.length-1]

      this.ADD_LIST({
        title : title,
        boardId : this.board.id,
        pos : lastList ? lastList.pos * 2 : 65535
      }).then(() => this.restore())
    },
    restore() {
      this.isAddList = false
      this.inputTitle = ''
    }
  }
}
</script>

<style scoped>

  .add-list {
    background-color: rgba(0,0,0,.1);
    padding: 12px;
    transition: all .3s;
  }
  .add-list a {
    color: #dddddd;
  }

  .add-list:hover
  .add-list:focus {
    background-color: rgba(0,0,0,.3);

  }


</style>
