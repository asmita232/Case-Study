function getCurrentDate() {
    
    let tempDate = {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
        date: (new Date()).getDate()
    }
    
    return getDate(tempDate)
    
}

function getDate({year, month, date}) {

    month = (month.toString()).length < 2? `0${month}`: `${month}`

    date = (date.toString()).length < 2? `0${date}`: `${date}`

    year = year.toString()

    let currDate = year + "-" + month + "-" + date
    // console.log(currDate)
    return currDate
}

module.exports = {
    getDate,
    getCurrentDate
}