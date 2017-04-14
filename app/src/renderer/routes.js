export default [
  {
    path: '/',
    name: 'bookshelf',
    component: require('components/Bookshelf')
  },
  {
    path: '/books/:id',
    name: 'bookInfo',
    component: require('components/BookInfo')
  },
  {
    path: '/books/:id/read',
    name: 'reader',
    component: require('components/reader')
  },
  {
    path: '*',
    redirect: '/'
  }
]
