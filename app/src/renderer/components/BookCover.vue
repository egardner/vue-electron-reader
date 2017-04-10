<template>
  <div class="book-cover">
    <router-link :to="`/books/${bookPath}`">
      <img class="book-cover__image" :alt="book.title" :src="coverThumbnail"/>
    </router-link>
    <h3 class="book-cover__title">{{book.title}}</h3>
    <h3 class="book-cover__author">{{book.author.name}}</h3>
  </div>
</template>

<script>
 import _ from 'lodash'
 export default {
   name: 'book-cover',
   components: {},
   props: ['book'],
   data () {
     return {}
   },
   computed: {
     coverThumbnail () {
       let urlPrefix = 'https://standardebooks.org'
       let thumbnailLink = _.find(this.book.link, (item) => {
         return item.rel === 'http://opds-spec.org/image/thumbnail'
       })

       if (thumbnailLink) { return `${urlPrefix}${thumbnailLink.href}` }
     },
     bookPath () {
       return this.book.id.split('/').pop()
     }
   }
 }
</script>

<style scoped>
 .book-cover {
   flex-grow: 0;
   flex-shrink: 0;
   flex-basis: 10rem;
   margin: 1rem;
 }

 .book-cover__image {
   max-width: 10rem;
 }

 .book-cover__title {
   font-size: 1em;
   margin-top: 0.5em;
 }

 .book-cover__author {
   font-size: 0.85em;
   margin-top: 0.5em;
 }
</style>
