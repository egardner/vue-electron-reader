<template>
  <div>
    <nav-bar></nav-bar>
    Reading!
  </div>
</template>

<script>
 import NavBar from './NavBar.vue'
 import _ from 'lodash'
 export default {
   name: 'reader',
   components: { NavBar },
   computed: {
     books () {
       return this.$store.state.books
     },
     bookID () {
       return this.$route.params.id
     },
     book () {
       return _.find(this.books, (b) => {
         let bookPath = b.id
         return bookPath === this.bookID
       })
     }
   }
 }
</script>

<style>
</style>
