<template>
  <div class="list" :data-list-id="data.id" :data-list-pos="data.pos">
    <div class="list-header">
      <div class="list-header-title">
        <input v-if="isEditTitle" class="form-control input-title" type="text" v-model="inputTitle"
               ref="inputTitle" @blur="onSubmitTitle" @keyup.enter="onSubmitTitle">
        <div v-else @click="onEditTitle">{{ data.title }}</div>
      </div>
    </div>


    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card"/>
    </div>

    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard=false"/>
    </div>
    <div v-else>
      <a class="add-card-btn" href="#" @click.prevent="isAddCard=true">
        &plus; Add a card..
      </a>
    </div>
  </div>
</template>

<script>
import AddCard from './AddCard'
import CardItem from './CardItem'
import {mapActions} from "vuex";

export default {
  props: ['data'],
  components: {
    AddCard,
    CardItem
  },
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_LIST'
    ]),
    onEditTitle() {
      this.isEditTitle = !this.isEditTitle
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return

      const id = this.data.id
      const title = this.inputTitle
      this.UPDATE_LIST({id, title})

      this.inputTitle = ''
      this.isEditTitle = false
    }
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}

.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}

.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}

.input-title {
  width: 90%;
}

.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}

.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}

.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}

.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}

.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}
</style>
