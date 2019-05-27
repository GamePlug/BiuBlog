const util = {
  formatTime: function (time) {
    const change = t => t < 10 ? "0" + t : t
    const d = new Date(parseInt(time))
    const year = d.getFullYear()
    const month = change(d.getMonth() + 1)
    const day = change(d.getDate())
    const hour = change(d.getHours())
    const minute = change(d.getMinutes())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  }
}

export default util
