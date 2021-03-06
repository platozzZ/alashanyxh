const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 获取 YY-MM-DD HH:MM
const formatTimes = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
// 获取 YY-MM-DD
const formatDates = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
// 获取 YY/MM/DD
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

// 获取 MM/DD
const formatMD = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [month, day].map(formatNumber).join('/')
}
const getYear = date => {
	const year = date.getFullYear()
	return year
}
const getMonth = date => {
	const month = date.getMonth() + 1
	return formatNumber(month)
	// return month
}
const getDay = date => {
	const day = date.getDate()
	return formatNumber(day)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimes: formatTimes,
  formatDate: formatDate,
  formatDates: formatDates,
  formatMD: formatMD,
  getYear,
  getMonth,
  getDay
}
