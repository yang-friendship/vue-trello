<template>

  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>bid: {{ bid }}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <hr/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  created() {
    this.fetchData()
  },
  data() {
    return {
      bid: 0,
      loading: false,

    }
  },
  methods: {
    fetchData() {
      setTimeout(() => {
        this.bid = this.$route.params.bid;
        this.loading = true;
      }, 500)

    }
  }
}
</script>

<style scoped>

</style>
