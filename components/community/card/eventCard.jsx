import { usePostContext } from '@/context/post-context';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import ShareModal from '../modal/shareModal';
import styles from './card.module.css';

export default function EventCard({ event }) {
  const { handleAttendedClick, attendedEvents } = usePostContext();
  const [isFlipped, setIsFlipped] = useState(false);

  const isAttended = attendedEvents[event.comm_event_id] || false;

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 於前端處理地點顯示
  const formatLocation = (location) => {
    // 檢查 location 是否有足夠長度, 如果沒有直接返回原字串
    return location.length > 6 ? location.substring(0, 6) : location;
  };

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
                  onClick={() => handleAttendedClick(event)}
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
