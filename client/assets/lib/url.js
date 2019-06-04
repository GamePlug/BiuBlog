const url = {
  a: {
    github: 'https://github.com/GamePlug/BiuBlog',
    index: '',
    admin: 'admin',
    blogWrite: 'admin/blog/write'
  },

  index: '/',
  admin: '/admin',
  about: '/about',
  blogList: id => id ? `/blog/${id}` : '/blog',
  blogView: id => `/blog/view/${id}`,
  blogManage: '/admin/blog'
}

export default url
