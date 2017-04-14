<template>
  <div>
    <nav-bar></nav-bar>
    <div v-if="book" class="book-info">
      <div class="book-info__main">
        <div class="book-info__main__image" >
          <img alt="" :src="coverImage"/>
        </div>
        <div class="book-info__main__summary">
          <div class="book-info__main__summary__contents">
            <h1 class="title is-1">{{ book.title }}</h1>
            <h2 class="subtitle is-3">{{ book.author.name }}</h2>
            <p class="book-info-summary-text">{{ book.summary['_'] }}</p>
            <router-link :to="`/books/${book.id}/read`"
                         class="button is-info">
              Start Reading
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="book-info__loading">
      <h1 class="title">Loading</h1>
    </div>
  </div>

</template>

<script>
 import _ from 'lodash'
 import NavBar from './NavBar.vue'
 export default {
   name: 'bookinfo',
   components: { NavBar },
   computed: {
     baseURL () {
       return this.$store.state.baseURL
     },
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
     },
     coverImage () {
       let imageLink = _.find(this.book.link, (item) => {
         return item.rel === 'http://opds-spec.org/image'
       })

       if (imageLink) { return `${this.baseURL}${imageLink.href}` }
     }
   }
 }
</script>

<style>
 .book-info {
   position: absolute;
   left: 0;
   top: 0;
   height: 100%;
   padding-top: 50px;
   width: 100%;
 }

 .book-info__main {
   display: flex;
   height: 100%;
 }

 .book-info__main__image {
   align-items: center;
   display: flex;
   flex-direction: column;
   flex: 1;
   justify-content: center;
 }

 .book-info__main__image img {
   box-shadow: 2px 3px 2px #666;
   display: block;
   max-height: 80%;
   width: auto;
 }

 .book-info__main__summary {
   flex: 1;
   align-self: center;
   padding: 0 2em;
   text-align: left;
 }

 .book-info__main__summary__contents {
   margin: 0 auto;
   max-width: 550px;
 }

 .book-info-summary-text {
   font-size: 1.25em;
   margin: 1.5em 0;
 }

 .book-info__loading {
   align-items: center;
   display: flex;
   flex: 0 0 100%;
   height: 100%;
   justify-content: center;
   left: 0;
   position: absolute;
   top: 0;
   width: 100%;
 }

 .book-info__loading .title {
   max-width: 50%;
 }
</style>
