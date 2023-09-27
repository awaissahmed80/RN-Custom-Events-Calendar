import React, { useState } from "react"
import { StatusBar, SafeAreaView, View, StyleSheet } from "react-native"
import eventsData from './data/events-data.json'
import CalendarStrip from "./Components/CalendarStripe"
import EventsCalendar from "./Components/EventsCalendar"
import Groups from "./Components/Groups"
import moment from "moment"

export default function App(){

    const [ currentDate, setCurrentDate ] = useState(moment("17-02-2023", "DD-MM-YYYY"))
    const [ groups, setGroups ] = useState([])

    let filtered = eventsData;

    if(currentDate){
        let selected = moment(currentDate).format('DD-MM-YYYY');        
        filtered = eventsData.filter((x) =>  {            
            if(groups?.length === 0){
                return moment(x?.date, "DD-MM-YYYY").format('DD-MM-YYYY') === selected
            }else{
                return (moment(x?.date, "DD-MM-YYYY").format('DD-MM-YYYY') === selected && groups.includes(x?.group) )
            }
        })
    }
    


    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <CalendarStrip value={currentDate} onChange={(val) => setCurrentDate(val)} />
                <Groups  values={groups} onChange={(values) => setGroups(values)}  />                
                <EventsCalendar  
                    onTap = {(e) => console.log("Value", e) }                      
                    events={filtered}                
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