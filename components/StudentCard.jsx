import { StyleSheet, Text, View, ActivityIndicator,Image } from 'react-native'
import React from 'react'
import colors from '../constants/Colors'
import driverImage from '../assets/images/driver.png'

const ChildCard = ({ item,drivers,fetchingDriversLoading }) => {
    
  if(fetchingDriversLoading) {
    return (
      <View style={styles.spinner_error_container}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.student_info_box}>
        <Text style={styles.student_info_text}>{item.student_school}</Text>
        <Text style={styles.student_info_text}>{item.student_full_name}</Text>
      </View>
      {drivers[item.driver_id] && (
        <View style={styles.driver_car_box}>

          <View style={styles.driver_info_box}>
            <View style={styles.driver_photo_box}>
              <Image source={{uri:drivers[item.driver_id].driver_personal_image}} style={styles.image}/>
            </View>
            <View>
              <Text style={styles.driver_name}>{drivers[item.driver_id].driver_full_name}</Text>
            </View>
          </View>

          <View style={styles.car_info_box}>
            <View style={styles.car_photo_box}>
              <Image source={{uri:drivers[item.driver_id].driver_car_image}} style={styles.image}/>
            </View>
            <View style={styles.related_info_box}>
              <Text style={styles.car_name}>{drivers[item.driver_id].driver_car_plate}</Text>
              <Text style={styles.car_name}>{drivers[item.driver_id].driver_car_model}</Text>
              <Text style={styles.car_name}>{drivers[item.driver_id].driver_car_type}</Text>
            </View>
          </View>

        </View>
      )
    }
    </View>
  )
}

export default ChildCard

const styles = StyleSheet.create({
  container:{
    margin:10,
    paddingVertical:10,
    alignItems:'center',
    backgroundColor:'#F6F8FA',
    borderRadius:15
  },
  student_info_box:{
    width:350,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  student_info_text:{ 
    fontFamily:'Cairo_400Regular',
    fontSize:14
  },
  school_name_text:{
    fontFamily:'Cairo_400Regular',
    fontSize:14
  },
  driver_car_box:{
    width:350,
    paddingHorizontal:10,
    marginTop:15,
    justifyContent:'space-between',
    alignItems:'center',
  },
  driver_info_box:{
    width:350,
    height:100,
    flexDirection:'row-reverse',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  image:{
    height:80,
    width:80,
    borderRadius:50,
    resizeMode:'contain',
  },
  car_info_box:{
    width:350,
    paddingVertical:8,
    flexDirection:'row-reverse',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  driver_name:{
    fontFamily:'Cairo_400Regular',
    fontSize:14,
    color:'#858585'
  },
  related_info_box:{
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20
  },
  car_name:{
    fontFamily:'Cairo_400Regular',
    fontSize:13,
    color:'#858585'
  },
})
