import https from 'https'
import xml2js from 'xml2js'

let store = {
  debug: true,
  state: {
    books: []
  },
  // Pull down an XML OPDS feed and parse it
  fetchBooksAction (url) {
    this.debug && console.log('Replacing books with data from:', url)

    // Make the XML behave more like JSON
    let parser = new xml2js.Parser({
      mergeAttrs: true,
      explicitArray: false
    })

    // Hit the URL and add each <entry> item to the Books array
    https.get(url, (response) => {
      let body = ''
      let newBooks = []
      response.on('data', function (d) { body += d })
      response.on('end', () => {
        parser.parseString(body, (err, result) => {
          if (err) { console.log(err) }
          result.feed.entry.forEach((item) => { newBooks.push(item) })
          this.state.books = newBooks
        })
      })
    })
  }
}

export default store
