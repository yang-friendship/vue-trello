<template>

  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>bid: {{ bid }}</div>
      <pre>{{ board }}</pre>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <hr/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from "vuex";

export default {
  name: "Board",
  created() {
    console.log('create fetch board');
    this.fetchData()
  },
  computed: {
    ...mapState([
      'board'
    ])
  }
  ,
  data() {
    return {
      bid: 0,
      loading: false,
    }
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD'
    ]),
    fetchData() {
      this.loading = true
      let bid = this.$route.params.bid;
      console.log("bid:" + bid);
      this.FETCH_BOARD({id: bid})
      .then(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
