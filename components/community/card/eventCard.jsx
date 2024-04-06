import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styles from './card.module.css';

const mockData = {
  time: '2024 年 5 月 18 日 9:00 下午',
  title: '復古派對',
  location: '台北, 台灣',
  details: '翻玩經典唱片，重溫老歌的美好回憶',
};

export default function EventCard(index) {
  const [isAttended, setIsAttended] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAttendedClick = () => {
    setIsAttended(!isAttended);
  };

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className={styles['flip-card']} onClick={handleDoubleClick}>
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
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!"
                className="card-photo w-[330px] h-[330px] object-cover"
              />
            </figure>
            <div className="card-body h-auto w-full p-0 overflow-auto flex flex-col justify-between">
              <div className="card-info text-h4 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                  <div className="card-infoLeft flex flex-row gap-2 px-1 py-1">
                    <div className="flex flex-col">
                      <p className="text-h6">{mockData.time}</p>
                      <p className="text-h6">{mockData.title}</p>
                      <p className="text-h6">{mockData.location}</p>
                    </div>
                  </div>
                  <div className="card-iconListRight flex justify-end px-1 py-1">
                    <FiSend className="card-icon hover:text-neongreen" />
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
          <div className={styles['flip-card-back']}>
            <h1>{mockData.title}</h1>
            <p>{mockData.location}</p>
            <p>{mockData.time}</p>
            <p>{mockData.details}</p>
          </div>
        </div>
      </div>
    </>
  );
}
