import { useEffect, useState } from 'react';
import Sidebar from '@/components/community/sidebar/sidebar';
import ProfileCard from '@/components/community/card/profileCard';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import ProfileInfo from '@/components/community/profileInfo/profileInfo';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../page.module.css';

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getCommunityProfilePost = async () => {
    if (!hasMore) return; // 防止重複請求
    setIsLoading(true); // 開始加載
    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
      setPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
      setPage((prevPage) => prevPage + 1); // 更新頁碼
      setIsLoading(false); // 結束加載
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  useEffect(() => {
    getCommunityProfilePost();
  }, []);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center justify-center sm:w-full pt-28">
        <div className="flex flex-wrap justify-center">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>
          <div className="flex flex-col w-full md:w-10/12 items-center">
            <div className="flex flex-col items-center">
              {/* info area */}
              <ProfileInfo posts={posts} />
              {/* post area */}
              <div className="flex flex-wrap gap-5 justify-center">
                <InfiniteScroll
                  dataLength={posts.length}
                  next={getCommunityProfilePost}
                  hasMore={hasMore}
                  loader={
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        textAlign: 'center',
                        minHeight: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div className={`${styles[`lds-heart`]}`}>
                        <div></div>
                      </div>
                    </div>
                  }
                  // endMessage={<p>No more posts</p>}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1.25rem',
                  }}
                >
                  {posts.map((post, i) => (
                    <ProfileCard post={post} key={i} />
                  ))}
                </InfiniteScroll>
              </div>
              {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
