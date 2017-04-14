<template>
  <nav class="nav has-shadow">
    <div class="nav-left">
    </div>
    <div class="nav-center">
      <div class="nav-item">
        <h1 class="title">{{ pageTitle }}</h1>
      </div>
    </div>
    <div class="nav-right">
    </div>
  </nav>
</template>

<script>
 import _ from 'lodash'
 export default {
   name: 'navbar',
   computed: {
     books () {
       return this.$store.state.books
     },
     pageTitle () {
       let currentBook = this.findBook(this.$route.params.id)
       if (currentBook) {
         return currentBook.title
       } else {
         return 'Standard Ebooks'
       }
     }
   },
   methods: {
     findBook (id) {
       return _.find(this.books, (b) => { return b.id === id })
     }
   }
 }
</script>

<style scoped>
 .nav {
   background-color: #333;
   top: 0;
   left: 0;
   width: 100%;
 }

 .title {
   color: #fff;
 }
</style>
