  function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) month = `0${date.getMonth() + 1}`
    let day = date.getDate()
    return `${day}/${month}/${year}`
}
  export {getDate}