<template>
  <div>
    <nav-bar></nav-bar>
    <div v-if="epub" class="epub">
      <h1>Contents</h1>
      <ul>
        <li v-for="item in toc">{{ item.label }}</li>
      </ul>
    </div>
    <div v-else class="epub-loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
 import https from 'https'
 import fs from 'fs'
 // import path from 'path'
 import _ from 'lodash'
 import ePub from 'epubjs'
 import { remote } from 'electron'
 import NavBar from './NavBar.vue'

 const { app } = remote

 export default {
   name: 'reader',
   components: { NavBar },
   data () {
     return {
       epub: undefined,
       toc: []
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
     }
   },
   methods: {
     downloadFile (url, dest, cb) {
       let file = fs.createWriteStream(dest)
       https.get(url, function (response) {
         response.pipe(file)
         file.on('finish', function () {
           file.close(cb)  // close() is async, call cb after close completes.
         })
       }).on('error', function (err) { // Handle errors
         fs.unlink(dest) // Delete the file async. (But we don't check the result)
         if (cb) cb(err.message)
       })
     },
     renderEpub (url) {
       this.epub = ePub(this.epubLink)
       this.epub.loaded.navigation.then((toc) => {
         toc.forEach((chapter) => {
           this.toc.push({ label: chapter.label, href: chapter.href })
         })
       })
     }
   },
   mounted () {
     console.log(app.getPath('userData'))
     this.renderEpub(this.epubLink)
     // let fileName = this.epubLink.split('/').pop()
     // let destPath = path.join(app.getPath('userData'), fileName)
     // this.downloadFile(this.epubLink, destPath, () => {
       // Do something with the file here
       // console.log(`File downloaded to ${destPath}`)
       // this.epub = ePub(this.epubLink)
     // })
   }
 }
</script>

<style>
</style>
