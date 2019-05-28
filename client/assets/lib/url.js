const url = {
  index: '/',
  about: '/about',
  admin: '/admin',
  blogList: id => id ? `/blog/${id}` : '/blog',
  blogView: id => `/blog/view/${id}`
}

export default url
