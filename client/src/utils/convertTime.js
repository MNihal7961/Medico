const convertTime = (time) => {
    const timeParts = time.split(':')
    let hours = parseInt(timeParts[0])
    let minuites = parseInt(timeParts[1])

    let meridiem = 'am'

    if (hours >= 12) {
        meridiem = 'pm'
        if (hours > 12) {
            hours -= 12
        }
    }

    return hours.toString().padStart(2)+ ":" + minuites.toString().padStart(2, '0') + " " + meridiem
}

export default convertTime;