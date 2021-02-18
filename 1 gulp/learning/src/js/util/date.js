/**
 * 计算天数差的函数，通用
 * @param sDate1 开始日期 '2002-12-18'
 * @param sDate2 介绍日期
 * @example DateDiff('2020-10-22','2021-10-22')
 * */
export function dateDiff (sDate1, sDate2) {
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  //转换为12-18-2002格式
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  //把相差的毫秒数转换为天数
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  return iDays
}