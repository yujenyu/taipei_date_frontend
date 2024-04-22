import React, { useState, useEffect } from 'react';
import OtherNoContentNoon from './other-no-content-noon';
import MoviePhotoOther from './movie-photo-other';
import BarPhotoOther from './bar-photo-other';

export default function OtherContentNoon({ trip_plan_id }) {
  console.log('Received trip_plan_id in OtherContentNoon:', trip_plan_id);
  const [tripDetails, setTripDetails] = useState({});

  useEffect(() => {
    if (trip_plan_id) {
      const fetchTripDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/trip/my-details/noon-content/${trip_plan_id}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched TripDetail Data:', data);
          // 假設 data 是數組或需要訪問特定屬性
          if (data && data.length > 0) {
            setTripDetails(data[0]);
            console.log('Setting tripDetail to:', data[0]);
          } else {
            // 設置一個明確的“沒有內容”的狀態
            setTripDetails({ block: null });
          }
        } catch (error) {
          console.error('Fetching trip details error:', error);
          // 在錯誤情況下也設置一個明確狀態
          setTripDetails({ block: null });
        }
      };

      fetchTripDetails();
    }
  }, [trip_plan_id]);
  console.log(tripDetails.block);
  // 根據 block 值來決定顯示哪個組件
  //   const content =
  //     tripDetails.block === 1 ? <TripPhotoMy /> : <NoContentMorning />;

  return (
    <>
      {tripDetails.block !== 2 ? (
        <OtherNoContentNoon />
      ) : tripDetails.movie_id ? (
        <MoviePhotoOther
          trip_plan_id={trip_plan_id}
          tripDetails={tripDetails}
        />
      ) : tripDetails.bar_id ? (
        <BarPhotoOther trip_plan_id={trip_plan_id} tripDetails={tripDetails} />
      ) : (
        <NoContentNoon />
      )}
    </>
  );
}
