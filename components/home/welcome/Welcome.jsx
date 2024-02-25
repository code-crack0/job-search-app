import { useState } from 'react'  
import { View, Text,TouchableOpacity,FlatList,TextInput,Image  } from 'react-native'
import { useRouter } from 'expo-router'
import {icons,SIZES} from "../../../constants"
import styles from './welcome.style'
const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Contracter",
]
const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const router = useRouter();
  const [activeJobType,setActiveJobType] = useState("Full-Time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Samad</Text>
        <Text style={styles.welcomeMessage}>Find your perfect Job</Text>

      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>

        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={(text)=>setSearchTerm(text)}
          placeholder='What are you looking for?'
          />
          </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage}/>
        </TouchableOpacity> 
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          keyExtractor={(item)=>item}
          contentContainerStyle={{columnGap:SIZES.small}}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.tab(activeJobType,item)} onPress={()=>{setActiveJobType(item); 
              router.push(`/search/${item}`) 
            }}>
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default Welcome