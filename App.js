import React, { useState } from "react"
import { StatusBar, SafeAreaView, View, StyleSheet, Text } from "react-native"
// import eventsData from './data/events-data.json'
// import CalendarStrip from "./Components/CalendarStripe"
// import EventsCalendar from "./Components/EventsCalendar"

import EventsCalendar from "./src/Components/EventsCalendar";
import eventsData from "./src/data/events-data.json";
import CalendarStrip from "./src/Components/CalendarStripe";

export default function App(){

    const [ month, setMonth ] = useState(null)
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <CalendarStrip value={month} onChange={(val) => setMonth(val)} />
                <EventsCalendar 
                    data={eventsData}
                
                />
            </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})