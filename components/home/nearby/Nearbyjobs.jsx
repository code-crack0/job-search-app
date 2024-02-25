import React from 'react'
import { View, Text ,TouchableOpacity,ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import {COLORS} from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import styles from './nearbyjobs.style'
import useFetch from '../../../hook/useFetch'
const Nearbyjobs = () => {
  const router = useRouter();
  const {data,isloading,error} = useFetch('search',{
    query: 'react developer',
    num_pages:1
  });
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Nearby Jobs
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
           data?.map((job)=>(
            <NearbyJobCard
              key={`nearby-job-${job?.job_id}`}
              job={job}
              handleNavigate={()=>router.push(`/job-details/${job?.job_id}`)}
            />
           ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs