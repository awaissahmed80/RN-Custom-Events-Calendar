import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { assets } from "../assets";

const groups = ['Group 01', 'Group 02', 'Group 03', 'Group 04' , 'Group 05' , 'Group 06'];

const Groups = ({values, onChange}) => {

    const [ open, setOpen ] = useState(false)

    const handleChange = (val) => {
        let vals = [...values]
        let index = vals?.findIndex((x) => x === val)
        if(index > -1){
            vals.splice(index, 1)
        }else{
            vals.push(val)
        }
        onChange(vals)
    }
    return(
        <>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => setOpen(!open)} style={styles.container}>
                    <Text>Groups</Text>            
                    <Image source={assets.downIcon} style={styles.icon}   alt="Left" />            
                </TouchableOpacity>
                {
                    open &&
                    <View style={{ ...styles.dropdown,  ...(open && {display: "flex"} ) }}>
                        <ScrollView style={styles.flex} bounces={false} >
                            {
                                groups?.map((group, g)=>
                                <TouchableOpacity onPress={() => handleChange(group)} style={{...styles.item, ...(values?.includes(group) && styles.selected) }} key={g}>
                                    <Text>{group}</Text>
                                </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                }
            </View>
            {
                (values?.length > 0) &&
                <View style={styles.tags}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            values?.map((value, v) => 
                            <TouchableOpacity key={v} onPress={() => handleChange(value)} style={styles.label}>
                                <Text style={styles.labelText}>{value}</Text>
                            </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </View>
            }

            {
                open &&
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={styles.overlay} />                    
                </TouchableWithoutFeedback>
            }
        </>
        
    )
}


const styles = StyleSheet.create({
    wrapper:{
        zIndex: 5,
        elevation: 3
    },  
    container:{
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc",
        position: "relative",
    },  
    dropdown: {
        width: "100%",
        maxHeight: 250,
        position: "absolute",
        left: 0,
        top: "100%",
        backgroundColor: "white",
        display: "none",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },  
    item:{
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: "#ddd"
    },
    selected:{
        backgroundColor: "#E2F3FF"
    },
    flex: {
        flex:1
    },
    overlay:{
        zIndex: 1,
        elevation: 1,
        position: "absolute", 
        left: 0, 
        top: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: "transparent"
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: "contain"
    },
    tags:{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    label:{
        backgroundColor: "#ccc",
        marginHorizontal: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    labelText:{
        fontSize: 12
    }
})

export default Groups;