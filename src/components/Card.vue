<template>

  <div>
    Card<br>
    <div v-if="loading">loading card...</div>
    <div v-else>cid:{{ cid }}</div>
  </div>

</template>

<script>
export default {
  name: "Card",

  watch: {

    '$route': {
      handler: 'fetchData',
      immediate: true
    }
  }
  ,
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.cid = this.$route.params.cid
        this.loading = false
      }, 600)
    }
  }
}
</script>

<style scoped>

</style>
