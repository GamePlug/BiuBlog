const url = {
  github: 'https://github.com/GamePlug/BiuBlog',
  admin: 'admin',

  index: '/',
  about: '/about',
  blogList: id => id ? `/blog/${id}` : '/blog',
  blogView: id => `/blog/view/${id}`
}

export default url
