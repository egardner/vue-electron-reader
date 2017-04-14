<template>
  <nav class="nav has-shadow">
    <div class="nav-left">
      <a v-if="currentBook" v-on:click="goBack" class="nav-item">
        <span class="icon">
          <i class="fa fa-chevron-left"></i>
        </span>
      </a>
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
     currentBook () {
       return this.findBook(this.$route.params.id)
     },
     pageTitle () {
       if (this.currentBook) {
         return this.currentBook.title
       } else {
         return 'Standard Ebooks'
       }
     }
   },
   methods: {
     findBook (id) {
       return _.find(this.books, (b) => { return b.id === id })
     },
     goBack () {
       this.$router.go(-1)
     }
   }
 }
</script>

<style scoped>
 .nav {
   background-color: #333;
   top: 0;
   left: 0;
   position: fixed;
   width: 100%;
 }

 .title {
   color: #fff;
 }
</style>
