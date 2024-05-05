import { useState, useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import { useAuth } from '@/context/auth-context';
import SuggestionBar from '@/components/community/suggestionbar/SuggestionBar';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import PostCardLarge from '@/components/community/card/postCardLarge';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Index() {
  const { auth } = useAuth();

  const {
    posts,
    currentKeyword,
    filteredPosts,
    indexHasMore,
    indexFilteredHasMore,
    filteredPage,
    isFilterActive,
    activeFilterButton,
    handleFilterClick,
    getCommunityIndexPost,
    getCommunityIndexFilteredPost,
  } = usePostContext();

  useEffect(() => {
    if (auth.id !== undefined && auth.id !== null) {
      if (!isFilterActive) {
        getCommunityIndexPost();
      }
      if (filteredPage === 1 && isFilterActive) {
        getCommunityIndexFilteredPost(currentKeyword);
      }
    }
  }, [auth.id, filteredPage, isFilterActive, currentKeyword]);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden w-full">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full pt-28">
        <div className="flex flex-wrap min-h-screen">
          <div className="hidden md:flex md:basis-3/12">
            <Sidebar />
          </div>
          <div className="flex w-full md:basis-6/12 justify-center">
            <div className="flex flex-col gap-8 min-h-screen justify-center items-center">
              <div className="filterBtn flex gap-5 justify-between sm:w-[330px] md:w-[480px] md:mx-auto sm:mx-5">
                <button
                  className={`${
                    activeFilterButton === '約會'
                      ? 'bg-primary text-black'
                      : 'bg-dark border'
                  } rounded-full hover:bg-primary hover:text-black w-28 h-8`}
                  onClick={() => {
                    handleFilterClick('約會');
                  }}
                >
                  約會
                </button>
                <button
                  className={`${
                    activeFilterButton === '酒吧'
                      ? 'bg-primary text-black'
                      : 'bg-dark border'
                  } rounded-full hover:bg-primary hover:text-black w-28 h-8`}
                  onClick={() => {
                    handleFilterClick('酒吧');
                  }}
                >
                  酒吧
                </button>
                <button
                  className={`${
                    activeFilterButton === '電影'
                      ? 'bg-primary text-black'
                      : 'bg-dark border'
                  } rounded-full hover:bg-primary hover:text-black w-28 h-8`}
                  onClick={() => {
                    handleFilterClick('電影');
                  }}
                >
                  電影
                </button>
              </div>

              <InfiniteScroll
                dataLength={
                  isFilterActive ? filteredPosts.length : posts.length
                }
                next={
                  isFilterActive
                    ? () => getCommunityIndexFilteredPost(currentKeyword)
                    : getCommunityIndexPost
                }
                hasMore={isFilterActive ? indexHasMore : indexFilteredHasMore}
                loader={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
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
                {(isFilterActive ? filteredPosts : posts).map((post, i) => (
                  <PostCardLarge post={post} key={i} />
                ))}
              </InfiniteScroll>
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:basis-3/12 justify-end pr-10">
            <SuggestionBar />
          </div>
        </div>
      </div>
    </>
  );
}
