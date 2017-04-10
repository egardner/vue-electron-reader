<template>
  <div class="book-info">
    <div class="book-info__image">
      <img alt="" :src="book.image"/>
    </div>
    <div class="book-info__summary">
      <div class="book-info__summary__contents">
        <h1>{{ book.title }}</h1>
        <h2>{{ book.author }}</h2>
        <p>{{ book.summary }}</p>
      </div>
    </div>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
 import _ from 'lodash'
 import store from '../store.js'
 export default {
   name: 'book-info',
   data () {
     return {
       books: store.state.books
     }
   },
   computed: {
     bookID () {
       return this.$route.params.id
     },
     book () {
       return _.find(this.books, (b) => {
         let bookPath = b.id.split('/').pop()
         return bookPath === this.bookID
       })
     }
   }
 }
</script>

<style>
 .book-info {
   display: flex;
   height: 100vh;
   flex-direction: row;
 }

 .book-info__image {
   align-items: center;
   display: flex;
   flex: 0 0 50%;
   justify-content: center;
 }

 .book-info__summary {
   align-items: center;
   display: flex;
   flex: 0 0 50%;
   flex-direction: column;
   justify-content: center;
   text-align: left;
 }

 .book-info__summary__contents {
   max-width: 800px;
   margin: 0 auto;
 }

</style>
