<template>
  <div class="bookshelf">
    <header class="bookshelf__header">
      <h1>Recovering the Classics</h1>
    </header>
    <div class="bookshelf__grid">
      <template v-for="book in books">
        <book-cover :book="book"> </book-cover>
      </template>
    </div>
  </div>
</template>

<script>
 import BookCover from './BookCover.vue'
 export default {
   name: 'bookshelf',
   components: { BookCover },
   data () {
     return {
       books: require('../../../static/classics.json')
     }
   }
 }
</script>

<style scoped>
 .bookshelf__header {
   margin-top: 1rem;
   margin-bottom: 1rem;
   padding-bottom: 1rem;
   border-bottom: solid 1px #ccc;
 }

 .bookshelf__grid {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
   align-items: baseline;
   margin: 1rem;
 }
</style>
