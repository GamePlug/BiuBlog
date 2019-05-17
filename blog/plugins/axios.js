function getCommonHeaders() {
  return {
    _author: 'leichao',
    _sign: 'chenqiaojun'
  }
}

function getCommonParams() {
  return {
    _random: Date.now(),
    _client: 'web',
    _version: '1.0.0'
  }
}

export default function ({$axios, redirect}) {
  // http request 拦截器
  $axios.interceptors.request.use(
    req => {
      req.headers = {
        ...req.headers,
        ...getCommonHeaders()
      }
      if (req.method === 'post') {
        req.data = {
          ...req.data,
          ...getCommonParams()
        }
      } else if (req.method === 'get') {
        req.params = {
          ...req.params,
          ...getCommonParams()
        }
      }
      return req
    }, err => {
      return Promise.reject(err)
    }
  )

  // http response 拦截器
  $axios.interceptors.response.use(
    res => {
      switch (res.data.err) {
        case 2:
          redirect('/user/login')
          break
      }
      return res
    }, err => {
      return Promise.reject(err)
    }
  )
}
