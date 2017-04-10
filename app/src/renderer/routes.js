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
    path: '*',
    redirect: '/'
  }
]
