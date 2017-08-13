<template lang="pug">
v-card.grey.lighten-5(flat)
  v-toolbar.primary.elevation-3(dark, extended)
    v-toolbar-title Opposition APP
  v-layout(row)
    transition(name="fade" mode="out-in")
      router-view    

</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped lang="scss">

</style>
