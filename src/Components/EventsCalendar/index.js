import React, { useState, useEffect} from "react"
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { getTimes, groupEvents } from "../../utils"
import moment from "moment"

export default function EventsCalendar({events, onTap, ...rest}){


    const [ items, setItems ] = useState([])
    const [ childHeight, setChildHeight ] = useState(900)
    const [ itemHeight, setItemHeight ] = useState(0)

    useEffect(() => {
        setItems(groupEvents(events))
        setItemHeight(50)
    }, [events])
    

    const calculatePosition = (g, k) => {       
        let start = moment(g.start, 'hh:mm a')
        let end = moment(g.end, 'hh:mm a')
        let first = moment("12:00 AM", 'hh:mm a')
        let duration = moment.duration(end.diff(start));
        duration = duration.asMinutes()
        let duration2 = moment.duration(start.diff(first));
        duration2 = duration2.asMinutes()                   
        return {width: (duration) * 3, top: !k ? 0 : (k * (itemHeight + 5)),  left: duration2 * 3, position: "absolute"}
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
                    contentContainerStyle={{ height: items?.length * (itemHeight + 10) }}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={16}
                >
                {items?.map((item, k) =>
                <View key={k} onLayout={handleLayout} style={{ ...styles.group}}>
                    {item?.map((event, e) =>
                        <View key={e} style={{...styles.event, height: itemHeight, backgroundColor: event?.color, ...calculatePosition(event,  k ) }}>
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => onTap(event)}>
                            <Text>{`${event?.start + " - " + event?.end}`}</Text>
                            </TouchableOpacity>
                            {/* <Text>{event?.title}</Text> */}
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
        padding: 10,
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
    },
    group: {
        // flexDirection: 'row'
    }
})