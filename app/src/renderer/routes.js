export default [
  {
    path: '/',
    name: 'bookshelf',
    component: require('components/Bookshelf')
  },
  {
    path: '*',
    redirect: '/'
  }
]
