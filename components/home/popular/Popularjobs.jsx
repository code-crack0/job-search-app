import React from 'react'
import { View, Text ,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {COLORS,SIZES} from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'
import useFetch from '../../../hook/useFetch'
const Popularjobs = () => {
  const router = useRouter();
  const {data,isloading,error} = useFetch('search',{
    query: 'react developer',
    num_pages:1
  });
  const [selectedJob,setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item?.job_id}`);
    setSelectedJob(item?.job_id);
  }
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Popular Jobs
        </Text>
        <TouchableOpacity >
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        { 
          isloading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
          ): error ? (
            <Text>Failed to load jobs</Text>
          ): data.length === 0 ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
          ):
          (
            <FlatList
              data = {data}
              keyExtractor={(item)=>item?.job_id}
              renderItem={({item})=> {
                return (
                  <PopularJobCard
                    item={item}
                    selectedJob={selectedJob}
                    handleCardPress={()=>handleCardPress(item)}
                  />
                )
              
              }}
              contentContainerStyle={{columnGap:SIZES.medium}}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs