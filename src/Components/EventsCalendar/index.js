import React, { useState, useEffect} from "react"
import { View, ScrollView, StyleSheet, Text} from 'react-native'
import { getTimes, groupEvents } from "../../utils"
import moment from "moment"

export default function EventsCalendar({events, ...rest}){


    const [ items, setItems ] = useState([])
    const [ childHeight, setChildHeight ] = useState(900)

    useEffect(() => {
        setItems(groupEvents(events))
    }, [events])
    

    const calculatePosition = (g, e = null) => {
                
        if(!e){                         
            let start = moment(g.start, 'hh:mm a')            
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')            
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()                   
            return {left: duration2 * 3, top: 0, position: "absolute"};
        }else{
            let start = moment(e.start, 'hh:mm a')
            let end = moment(e.end, 'hh:mm a')
            let first = !e ? moment("12:00 AM", 'hh:mm a') : moment(g.start, 'hh:mm a')
            let duration = moment.duration(end.diff(start));
            duration = duration.asMinutes()
            let duration2 = moment.duration(start.diff(first));
            duration2 = duration2.asMinutes()                   
            return {width: (duration) * 3,  marginLeft: duration2 * 3, }
        }
    }

    const handleLayout = (e) => {    
        var {height} = e.nativeEvent.layout;
        if(height > childHeight){
            setChildHeight(height)
        }
    }
    

    return(
        <ScrollView contentContainerStyle={styles.container}  scrollEventThrottle={16} directionalLockEnabled={true} flex={1} horizontal overScrollMode="never" bounces={false}>
            {
                getTimes().map((item, i) => 
                    <View key={i} style={styles.slot}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )
            }

            <ScrollView 
                    style={{...styles.calendar}} 
                    contentContainerStyle={{ height: childHeight }}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={16}
                >
                {items?.map((item, k) =>
                <View key={k} onLayout={handleLayout} style={{ ...calculatePosition(item)}}>
                    {item?.events?.map((event, e) =>
                    <View key={e} style={{...styles.event, backgroundColor: event?.color, ...calculatePosition(item, event)}}>
                        <Text>{`${event?.start + " - " + event?.end}`}</Text>
                        <Text>{event?.title} - ({event?.group})</Text>
                        {/* <Text>{event?.subtitle}</Text> */}
                    </View>
                    )}
                </View>
                )}
            </ScrollView>
           
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
         zIndex: 0, 
        position: "relative" 
    },
    slot: {
        width: 90,
        paddingVertical: 15,
        borderRightWidth: 1,
        borderColor: "#eee",
        zIndex: 1,
    },
    text:{
        textAlign: 'center'
    },
    event:{
        marginVertical: 5,
        padding: 15,
        marginHorizontal: 1,
        borderRadius: 5,

    },
    calendar: {
        flexGrow: 1,        
        // flex: 1,
        marginTop: 40,
        zIndex: 1,
        position: 'absolute', 
        left: 0,
        top: 0,        
        bottom: 0,
        right: 0,
    }
})