<template>
  <div>
    <nav-bar></nav-bar>
    <div v-if="epub" class="epub">
      <div class="epub__cover" id="stage">
      </div>
      <div class="epub__contents">
        <div id="contents" v-html="currentContents">
        </div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
    <div v-else class="epub-loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
 /* eslint-disable no-unused-vars */
 import https from 'https'
 import fs from 'fs'
 import path from 'path'
 import _ from 'lodash'
 import Epub from 'epubjs'
 import { remote } from 'electron'
 import NavBar from './NavBar.vue'

 const { app } = remote

 export default {
   name: 'reader',
   components: { NavBar },
   data () {
     return {
       epub: new Epub(),
       spine: null,
       currentLocation: null,
       currentContents: null
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
     // Not currently being used, but saving in case it is needed later
     downloadFile (url, dest, cb) {
       let file = fs.createWriteStream(dest)
       https.get(url, function (response) {
         response.pipe(file)
         file.on('finish', function () {
           file.close(cb)
         })
       }).on('error', function (err) {
         fs.unlink(dest)
         if (cb) cb(err.message)
       })
     },
     loadEpub (url) {
       // Load the epub file
       this.epub.open(this.epubLink)

       // Do stuff once it's ready
       this.epub.ready.then((book) => {
         let [manifest, spine, metadata, cover, navigation, resources] = book
         this.spine = spine
         this.currentLocation = spine.items[0].href
       })
     },
     updateContents () {
       this.epub.ready.then(() => {
         this.epub.load(this.currentLocation).then((contents) => {
           this.currentContents = contents.documentElement.querySelector('body').innerHTML
         })
       })
     }
   },
   mounted () {
     this.loadEpub(this.epubLink)
     this.updateContents()

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
