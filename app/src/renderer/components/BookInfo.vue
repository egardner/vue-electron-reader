<template>
  <div class="book-info">
    <header class="book-info__header">
      <h1>{{ book.title }}</h1>
    </header>
    <main class="book-info__main">
      <div class="book-info__image" >
        <img alt="" :src="coverImage"/>
      </div>
      <div class="book-info__summary">
        <div class="book-info__summary__contents">
          <h1>{{ book.title }}</h1>
          <h2>{{ book.author.name }}</h2>
          <p>{{ book.summary['_'] }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
 import _ from 'lodash'
 export default {
   name: 'bookinfo',
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
     },
     coverImage () {
       let urlPrefix = 'https://standardebooks.org'
       let imageLink = _.find(this.book.link, (item) => {
         return item.rel === 'http://opds-spec.org/image'
       })

       if (imageLink) { return `${urlPrefix}${imageLink.href}` }
     },
     epubURL () {
       let epubLinks = _.filter(this.book.link, (item) => {
         return item.type === 'application/epub+zip'
       })
       return epubLinks
     }
   },
   methods: {
     goBack () {
       this.$router.go(-1)
     }
   }
 }
</script>

<style scoped>
 .book-info {
   display: flex;
   flex-direction: column;
   width: 100vw;
   height: 100vh;
 }

 .book-info__header {
   flex: 0 0 60px;
 }

 .book-info__main {
   flex: 1 auto 400px;
   height: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
 }

 .book-info__image {
   display: flex;
   height: 100%;
   align-items: center;
   justify-content: center;
   flex: 0 0 50%;
 }

 .book-info__image img {
   box-shadow: 2px 3px 2px #666;
   display: block;
   height: 80%;
   width: auto;
 }

 .book-info__summary {
   flex: 0 0 50%;
 }

 .book-info__summary__contents {
   height: 80%;
   margin: 5rem;
   text-align: left;
 }

</style>
