const url = {
  a: {
    github: 'https://github.com/GamePlug/BiuBlog',
    admin: 'admin',
    blogWrite: 'admin/blog/write'
  },

  index: '/',
  about: '/about',
  blogList: id => id ? `/blog/${id}` : '/blog',
  blogView: id => `/blog/view/${id}`,
  admin: '/admin',
  blogManage: '/admin/blog',
  blogWrite: '/admin/blog/write'
}

export default url
