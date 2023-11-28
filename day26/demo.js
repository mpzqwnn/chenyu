
var hour
var second
var t = false
var start = document.getElementsByTagName("input")[0]
var paused = document.getElementsByTagName("input")[1]
var timer = setInterval(() => {
    if (t) {
        hour = document.getElementsByTagName("span")[0]
        second = document.getElementsByTagName("span")[1]
        if (Number(hour.innerHTML) > 0 || Number(second.innerHTML) > 0) {
            if (Number(second.innerHTML) > 10) {
                second.innerHTML = Number(second.innerHTML) - 1
            } else if (Number(second.innerHTML) > 0) {
                second.innerHTML = "0" + (Number(second.innerHTML) - 1)
            } else if (Number(hour.innerHTML) > 10) {
                second.innerHTML = 60
                hour.innerHTML = Number(hour.innerHTML) - 1
            } else if (Number(hour.innerHTML) > 0) {
                second.innerHTML = 60
                hour.innerHTML = "0" + (Number(hour.innerHTML) - 1)
            }
        } else {
            alert("时间到！")
            v = clearInterval(timer)
        }
    }
}, 1000);
start.onclick=function () {
    t=true
}
paused.onclick=function () {
    t=false
}