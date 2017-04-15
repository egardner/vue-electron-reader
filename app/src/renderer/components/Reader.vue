<template>
  <div>
    <nav-bar></nav-bar>
    Reading!
  </div>
</template>

<script>
 import https from 'https'
 import fs from 'fs'
 import path from 'path'
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
         return false
       } else {
         return ePub(this.epubLink)
       }
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
     }
   },
   mounted () {
     console.log(app.getName())
     let fileName = this.epubLink.split('/').pop()
     let destPath = path.join(app.getPath('userData'), fileName)
     this.downloadFile(this.epubLink, destPath, () => {
       // Do something with the file here
       console.log(`File downloaded to ${destPath}`)
     })
   }
 }
</script>

<style>
</style>
