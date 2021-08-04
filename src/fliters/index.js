import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

Vue.filter('data-Timer', (value, TimerStr = 'yyyy-MM-dd HH:mm:ss') => {
  // return moment(value).format(TimerStr)
  return format(value, TimerStr)
})
