import moment from "moment"

export const getdDaysInMonth = (mon) => {
    var daysInMonth = moment(mon).daysInMonth();
    var arrDays = [];
    while(daysInMonth) {
      let current = moment(mon).date(daysInMonth);
      arrDays.push({day: moment(current).format('dd'), date:  moment(current).format('DD')});
      daysInMonth--;
    }
    
    return arrDays.reverse();
}

// const checkOverlap = (events, current) => {
//     const eventStart = moment(`${current.date} ${current.start}`, 'DD-MM-YYYY hh:mm A');
//     const eventEnd = moment(`${current.date} ${current.end}`, 'DD-MM-YYYY hh:mm A');

//     for (let j = 0; j < events.length; j++) {
//         const eve = events[j]
//         const eveStart = moment(`${eve.date} ${eve.start}`, 'DD-MM-YYYY hh:mm A');
//         const eveEnd = moment(`${eve.date} ${eve.end}`, 'DD-MM-YYYY hh:mm A');

//         if((eventStart >= eveStart && eventStart <= eveEnd) || (eventEnd >= eveStart && eventEnd <= eveEnd)){
//             return true
//         }           
//     }   
//     return false;
// }

export const getTimes = (start="12:00 AM", end="11:59 PM") => {
    // let fromTime = moment(start, 'HH:mm a');
    // let toTime = moment(end, 'HH:mm a');
    // let duration = moment.duration(toTime.diff(fromTime));
    // let diff = duration.minutes();
    // let array = [];
    // for (let i = 0; diff > i; i++) {
    //     let result = moment(fromTime).add(i/2, 'hours').format('HH:mm a')
    //     array.push(result)
    // }
    // return array;
    const items = [];
        new Array(24).fill().forEach((acc, index) => {
            // if(index > 7 && index < 24){
                items.push(moment( {hour: index} ).format('h:mm A'));
                items.push(moment({ hour: index, minute: 30 }).format('h:mm A'));
            // }
        })
        return items;
}


export const groupEvents = (arr) => {
    
    arr.sort((a, b) => {
        var aStart = moment(a.start, 'hh:mm A');
        var bStart = moment(b.start, 'hh:mm A');            

        var aDuration = moment.duration(moment(a.end, 'hh:mm A').diff(aStart));
        var bDuration = moment.duration(moment(b.end, 'hh:mm A').diff(bStart));

        if (aStart.isBefore(bStart)) {
            return -1;
        } else if (aStart.isAfter(bStart)) {
            return 1;
        } else {
            if (aDuration.asMinutes() > bDuration.asMinutes()) {
              return -1;
            } else if (aDuration.asMinutes() < bDuration.asMinutes()) {
              return 1;
            } else {
              return 0;
            }
        }
    });

    let events = arr
    
    let overlapping = []
    let nonOverlapping = []

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventStart = moment(`${event.date} ${event.start}`, 'DD-MM-YYYY hh:mm A');
        const eventEnd = moment(`${event.date} ${event.end}`, 'DD-MM-YYYY hh:mm A');
        let isOverlapping = false;
        
        for (let j = 0; j < overlapping.length; j++) {
            const existingEvent = overlapping[j];
            const existingEventStart = moment(`${existingEvent.date} ${existingEvent.start}`, 'DD-MM-YYYY hh:mm A');
            const existingEventEnd = moment(`${existingEvent.date} ${existingEvent.end}`, 'DD-MM-YYYY hh:mm A');
            
            
            // if (eventStart.isBetween(existingEventStart, existingEventEnd) || eventEnd.isBetween(existingEventStart, existingEventEnd)) {
            if((eventStart >= existingEventStart && eventStart <= existingEventEnd) || (eventEnd >= existingEventStart && eventEnd <= existingEventEnd)){
                overlapping[j].events.push(event);
                isOverlapping = true;
            break;
            }
        }
        

        if (!isOverlapping) {
            nonOverlapping.push({
                date: event.date,
                start: event.start,
                end: event.end,
                events: [event]
            });
            overlapping.push(nonOverlapping[nonOverlapping.length - 1]);
        }
    }

    return overlapping;
}