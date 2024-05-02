import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePostContext } from '@/context/post-context';
import { useAuth } from '@/context/auth-context';
import Sidebar from '@/components/community/sidebar/sidebar';
import ProfileCard from '@/components/community/card/profileCard';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import ProfileInfo from '@/components/community/profileInfo/profileInfo';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../page.module.css';

export default function Profile() {
  const { auth } = useAuth();

  const {
    profilePosts,
    setProfilePosts,
    userProfileHasMore,
    setUserProfileHasMore,
    profilePage,
    setProfilePage,
    checkFollowingStatus,
    checkPostsStatus,
    getPostComments,
    reload,
  } = usePostContext();

  const router = useRouter();
  const { uid } = router.query;

  const getCommunityUserProfilePost = async (page = profilePage) => {
    if (!userProfileHasMore) return; // 防止重複請求
    try {
      const res = await fetch(
        `http://localhost:3001/community/posts/${uid}?page=${page}&limit=12`
      );
      const data = await res.json();

      if (data.length === 0) {
        setUserProfileHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
        return; // 提前停止加載
      }

      const postIds = data.map((post) => post.post_id).join(',');

      await Promise.all([
        checkFollowingStatus(uid),
        checkPostsStatus(postIds),
        getPostComments(postIds),
      ]);

      setProfilePosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
      setProfilePage((prevPage) => prevPage + 1); // 更新頁碼
      // setIsLoading(false); // 結束加載
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  useEffect(() => {
    // Next.js 的路由器是異步, 確保拿到 uid 再 fetch !!! Important
    if (auth.id && uid) {
      setProfilePosts([]); // 清空現有貼文
      setUserProfileHasMore(true);
      setProfilePage(1);

      // 直接在這裡設置 profilePage 為 1 並立即執行資料加載
      setProfilePage((prevPage) => {
        const newPage = 1;
        getCommunityUserProfilePost(newPage); // 使用更新後的頁碼執行加載
        return newPage;
      });
    }
  }, [auth.id, uid, reload]); // uid 變化時重新調用, 或是重複點擊則 reload

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center justify-center pt-28 ">
        <div className="flex flex-wrap justify-center w-full min-h-screen">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          <div className="flex flex-col md:w-10/12 items-center">
            {/* info area */}
            <ProfileInfo posts={profilePosts} />
            {/* post area */}
            <div className="flex flex-wrap gap-5 justify-center">
              <InfiniteScroll
                dataLength={profilePosts.length}
                next={getCommunityUserProfilePost}
                hasMore={userProfileHasMore}
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
                {profilePosts.map((post, i) => (
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
    </>
  );
}
