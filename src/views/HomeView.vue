<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button class="btn btn-primary" @click="gotoDaybook">Go to Daybook</button>
  </div>
</template>

<script>
export default {
  methods: {
    gotoDaybook() {
      this.$router.push({name: 'no-entry'})
    }
  }
}
</script>

