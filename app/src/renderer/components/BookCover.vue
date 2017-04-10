<template>
  <div class="book-cover">
    <router-link :to="`/books/${book.id}`">
      <img alt="" :src="book.image"/>
    </router-link>
    <h3 class="book-cover__title">{{book.title}}</h3>
  </div>
</template>

<script>
 export default {
   name: 'book-cover',
   components: {},
   props: ['book'],
   data () {
     return {}
   }
 }
</script>

<style scoped>
 .book-cover {
   flex-grow: 0;
   flex-shrink: 0;
   flex-basis: 10rem;
   margin-top: 1rem;
   margin-bottom: 1rem;
 }

 .book-cover__title {
   font-size: 1em;
   margin-top: 0.5em;
 }
</style>
