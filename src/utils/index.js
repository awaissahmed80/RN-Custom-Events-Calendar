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


export const getTimes = (start="12:00 AM", end="11:59 PM") => {
  
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
        return aStart - bStart       
    });

    let events = arr
    

    const eventGroups = events.reduce((acc, p) => {
        for(let i in acc) {
          if(moment(acc.at(i).at(-1).end, 'hh:mm A').isSameOrBefore(moment(p.start, 'hh:mm A'))) {
            acc[i] = [...acc.at(i), p];
            return acc;
          }
        }
        return [...acc, [p]];
      }, []);
    return eventGroups
}