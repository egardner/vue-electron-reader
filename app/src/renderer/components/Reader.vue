<template>
  <div>
    <nav-bar></nav-bar>
    Reading!
  </div>
</template>

<script>
 import NavBar from './NavBar.vue'
 import _ from 'lodash'
 import ePub from 'epubjs'
 export default {
   name: 'reader',
   components: { NavBar },
   data () {
     return {
     }
   },
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
     epubLink () {
       let epubLink = _
         .chain(this.book.link)
         .filter((item) => { return item.type === 'application/epub+zip' })
         .find((link) => {
           let href = link.href
           let ext = href.split('/').pop().split('.').pop()
           return ext === 'epub'
         })
         .value()

       if (epubLink) { return `${this.baseURL}${epubLink.href}` }
     },
     epub () {
       if (!this.epubLink) {
         return {}
       } else {
         return ePub(this.epubLink)
       }
     }
   }
 }
</script>

<style>
</style>
