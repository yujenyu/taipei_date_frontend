import { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import ShareModal from '../modal/shareModal';
import styles from './card.module.css';

// const mockData = {
//   time: '2024 年 5 月 18 日 9:00 下午',
//   title: '復古派對',
//   location: '台北, 台灣',
//   details: '翻玩經典唱片，重溫老歌的美好回憶',
// };

export default function EventCard({ event }) {
  const [isAttended, setIsAttended] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  // const [eventData, setEventData] = useState([]);

  const handleAttendedClick = async () => {
    // 如果已參加, 則取消參加
    if (isAttended) {
      // 發送取消參加的請求
      try {
        const res = await fetch(
          'http://localhost:3001/community/notattend-event',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            // ==================================== TODO TODO TODO ====================================
            body: JSON.stringify({ eventId: event.comm_event_id, userId: 1 }), // TODO: 需動態更改 userId
            // ==================================== TODO TODO TODO ====================================
          }
        );
        if (res.ok) {
          setIsAttended(false);
          // console.log('取消參加成功');
        } else {
          throw new Error('取消參加失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const res = await fetch(
          'http://localhost:3001/community/attend-event',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // ==================================== TODO TODO TODO ====================================
            body: JSON.stringify({ eventId: event.comm_event_id, userId: 1 }), // TODO: 需動態更改 userId
            // ==================================== TODO TODO TODO ====================================
          }
        );
        if (res.ok) {
          setIsAttended(true);
          // console.log('參加成功');
        } else {
          throw new Error('參加失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // 檢查當前用戶是否已參加活動
  const fetchIsAttended = async () => {
    try {
      // ==================================== TODO TODO TODO ====================================
      const response = await fetch(
        `http://localhost:3001/community/isAttended-event?eventId=${event.comm_event_id}&userId=1`
      ); // TODO: 需動態更改 userId
      // ==================================== TODO TODO TODO ====================================
      const data = await response.json();
      if (data.isAttended) {
        setIsAttended(data.isAttended);
      }
    } catch (error) {
      console.error('無法獲取收藏狀態:', error);
    }
  };

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 於前端處理地點顯示
  const formatLocation = (location) => {
    // 檢查 location 是否有足夠長度, 如果沒有直接返回原字串
    return location.length > 6 ? location.substring(0, 6) : location;
  };

  useEffect(() => {
    fetchIsAttended();
  }, [[event.comm_event_id]]); // 依賴 event.comm_event_id 確保當活動更新時重新檢查

  return (
    <>
      <div className={styles['flip-card']} onDoubleClick={handleDoubleClick}>
        <div
          className={`${styles['flip-card-inner']} ${
            isFlipped ? styles.flipped : ''
          }`}
        >
          <div
            className={`${styles['flip-card-front']} eventCard card md:w-[330px] md:h-[480px] flex items-center justify-center border border-grayBorder`}
          >
            <figure className="card-photo">
              <img
                src={event.img || '../../../public/unavailable-image.jpg'}
                alt={event.photo_name || 'No Image Available'}
                className="card-photo w-[330px] h-[330px] object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body h-auto w-[330px] p-0 overflow-auto flex flex-col justify-between">
              <div className="card-info text-h4 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                  <div className="card-infoLeft flex flex-row gap-2 px-1 py-1">
                    <div className="flex flex-col gap-3">
                      <p className="text-h6">{event.title}</p>
                      <p className="text-h6">
                        {formatLocation(event.location)}
                      </p>
                      <p className="text-h6">
                        {`${event.start_date} ${event.start_time}`}
                      </p>
                    </div>
                  </div>
                  <div className="card-iconListRight flex justify-end px-1 py-1">
                    <FiSend
                      className="card-icon hover:text-neongreen"
                      onClick={() =>
                        document.getElementById('share_modal').showModal()
                      }
                    />
                    <ShareModal />
                  </div>
                </div>
              </div>
              <div className="card-actions flex justify-center px-1 py-1 ">
                <button
                  className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3"
                  onClick={handleAttendedClick}
                >
                  {isAttended ? <span>已參加</span> : <span>參加</span>}
                </button>
              </div>
            </div>
          </div>
          <div className={`${styles['flip-card-back']} flex flex-col gap-5`}>
            <p className="text-h6">{event.title}</p>
            <p className="text-h6">{event.description}</p>
            <p className="text-h6">{event.location}</p>
            <p className="text-h6">
              {`${event.start_date} ${event.start_time} - ${event.end_date} ${event.end_time}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
