<template>
  <div class="bookshelf">
    <header class="bookshelf__header">
      <select v-model="selection" id="" name="">
        <option value="ALL">All Books</option>
        <option v-for="category in categories" :value="category"> {{ category }}</option>
      </select>
    </header>
    <div class="bookshelf__grid">
      <template v-for="book in filteredBooks">
        <book-cover :book="book"> </book-cover>
      </template>
    </div>
  </div>
</template>

<script>
 import BookCover from './BookCover.vue'
 import _ from 'lodash'
 export default {
   name: 'bookshelf',
   components: { BookCover },
   data () {
     return {
       selection: 'ALL'
     }
   },
   computed: {
     books () {
       return this.$store.state.books
     },
     // ALL THE AUTHORS from ALL THE BOOKS!
     authors () {
       return _
         .chain(this.books)
         .map('author')
         .map('name')
         .flatten()
         .uniq()
         .sort()
         .value()
     },
     // ALL THE CATEGORIES from ALL THE BOOKS!
     categories () {
       return _
         .chain(this.books)
         .map(function (b) {
           return _.map(b.category, 'term')
         })
         .flatten()
         .uniq()
         .sort()
         .value()
     },
     filteredBooks () {
       if (this.selection === 'ALL') {
         return this.books
       } else {
         return _.filter(this.books, (b) => {
           let categoryTerms = _.map(b.category, 'term')
           return _.includes(categoryTerms, this.selection)
         })
       }
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
   justify-content: center;
   align-items: baseline;
   margin: 1rem;
 }
</style>
