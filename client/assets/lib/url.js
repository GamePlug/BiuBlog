const url = {
  // 外链
  a: {
    github: 'https://github.com/GamePlug/BiuBlog',
    admin: 'admin'
  },
  // index
  index: '/',
  about: '/about',
  // blog
  blogList: id => id ? `/blog/${id}` : '/blog',
  blogView: id => `/blog/view/${id}`,
  // admin
  admin: '/admin',
  // admin-blog
  blogManage: '/admin/blog',
  blogType: '/admin/blog/type',
  blogDraft: '/admin/blog/draft',
  blogRecycle: '/admin/blog/recycle',
  blogWrite: id => id ? `/admin/blog/write/${id}` : '/admin/blog/write',
  // admin-auth
  authManage: '/admin/auth',
  authExplain: '/admin/auth/explain'
}

export default url
