import { StyleSheet, Text, View, ActivityIndicator,Image,ScrollView,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Link } from 'expo-router'
import { useStudentData } from '../../../stateManagment/StudentState'
import colors from '../../../../constants/Colors'
import logo from '../../../../assets/images/logo.jpeg'
import StudentHomePage from '../../../../components/StudentHomePage'

const home = () => {
  const { isLoaded } = useUser()
  const [selectedStudent,setSelectedStudent] = useState(0)
  const {students,fetchingStudentsLoading,fetchingdriverLoading} = useStudentData()

  // Wait untill data load
  if (fetchingStudentsLoading || fetchingdriverLoading || !isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.spinner_error_container}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      </SafeAreaView>
    );
  }

  // if the user have no registered students yet
  if(!students.length) {
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.no_registered_students_container}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logo_image}/>
          </View>
          <View style={styles.no_registered_students}>
          <Text style={styles.no_student_text}>ليس لديك طلاب مسجلين بالتطبيق</Text>
            <Link href="/addData" style={styles.link_container}>
              <Text style={styles.link_text}>اضف الآن</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.student_name_buttons_container}>
          {students.map((student,index) => (
           <TouchableOpacity
             key={index} // Use index as the key here
              style={[
               styles.student_name_button,
                selectedStudent === index && styles.active_student_name_button, // Apply active style if selected
              ]}
              onPress={() => setSelectedStudent(index)} // Set selected student by index
            >
              <Text style={[
                styles.student_name_button_text,
                selectedStudent === index && styles.active_student_name_button_text, // Apply active text style if selected
              ]}>
                {student.student_full_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
     </View>
        <View style={styles.student_info_container}>
          {students[selectedStudent] && (
           <StudentHomePage student={students[selectedStudent]} selectedStudent={selectedStudent}/>
         )}
        </View>
   </SafeAreaView>
  )}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  no_registered_students_container:{
    height:400,
    paddingTop:30,
    alignItems:'center',
    justifyContent:'space-between',
  },
  logo:{
    width:'100%',
    height:150,
    justifyContent:'center',
    alignItems:'center',
  },
  logo_image:{
    height:120,
    width:120,
    resizeMode:'contain',
  },
  no_registered_students: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_student_text: {
    fontFamily: 'Cairo_400Regular',
  },
  link_container: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    marginTop:10,
    borderRadius: 20,
  },
  link_text: {
    color: colors.WHITE,
    fontFamily: 'Cairo_700Bold',
    fontSize: 14,
  },
  scrollViewContainer:{
    height:60,
    width:'100%',
    position:'absolute',
    top:30,
    left:0,
    zIndex:100,
    alignItems:'center',
    justifyContent:'center',
  },
  student_name_buttons_container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  student_name_button:{
    backgroundColor:colors.WHITE,
    borderColor:'#ddd',
    borderWidth:1,
    minWidth:150,
    padding:10,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal: 5
  },
  student_name_button_text:{
    textAlign:'center',
    fontFamily: 'Cairo_400Regular',
    fontSize:13,
  },
  active_student_name_button:{
    backgroundColor:colors.PRIMARY,
    borderColor:colors.PRIMARY,
  },
  active_student_name_button_text:{
    color:colors.WHITE,
    fontFamily: 'Cairo_700Bold',
  },
  student_info_container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position:'relative',
  },
  spinner_error_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})