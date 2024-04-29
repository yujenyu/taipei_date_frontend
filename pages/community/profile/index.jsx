import { useEffect } from 'react';
// import { useAuth } from '@/context/auth-context';
// import { usePostContext } from '@/context/post-context';
import { useRouter } from 'next/router';
// import Sidebar from '@/components/community/sidebar/sidebar';
// import ProfileCard from '@/components/community/card/profileCard';
// import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
// import ProfileInfo from '@/components/community/profileInfo/profileInfo';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import styles from '../page.module.css';

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);

  // const { auth } = useAuth();

  // const { posts, profileHasMore, getCommunityProfilePost } = usePostContext();

  // useEffect(() => {
  //   if (auth.id === 0) {
  //     return;
  //   }

  //   getCommunityProfilePost();
  // }, [auth.id]);

  // return (
  //   <>
  //     <title>{'Community - Taipei Date'}</title>

  //     {/* sidebar for mobile */}
  //     <div className="block md:hidden">
  //       <TabbarMobile />
  //     </div>

  //     <div className="flex flex-col w-full items-center justify-center pt-28">
  //       <div className="flex flex-wrap justify-center w-full min-h-screen">
  //         <div className="hidden md:flex md:w-2/12">
  //           <Sidebar />
  //         </div>
  //         <div className="flex flex-col md:w-10/12 items-center">
  //           {/* info area */}
  //           <ProfileInfo posts={posts} />
  //           {/* post area */}
  //           <div className="flex flex-wrap gap-5 justify-center">
  //             <InfiniteScroll
  //               dataLength={posts.length}
  //               next={getCommunityProfilePost}
  //               hasMore={profileHasMore}
  //               loader={
  //                 <div
  //                   style={{
  //                     display: 'flex',
  //                     width: '100%',
  //                     textAlign: 'center',
  //                     minHeight: '100vh',
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                   }}
  //                 >
  //                   <div className={`${styles[`lds-heart`]}`}>
  //                     <div></div>
  //                   </div>
  //                 </div>
  //               }
  //               // endMessage={<p>No more posts</p>}
  //               style={{
  //                 display: 'flex',
  //                 flexWrap: 'wrap',
  //                 justifyContent: 'center',
  //                 gap: '1.25rem',
  //               }}
  //             >
  //               {posts.map((post, i) => (
  //                 <ProfileCard post={post} key={i} />
  //               ))}
  //             </InfiniteScroll>
  //           </div>
  //           {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
  //               {posts.map((_, index) => (
  //                 <ProfileCard key={index} />
  //               ))}
  //             </div>
  //             <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
  //               {posts.map((_, index) => (
  //                 <ProfileCard key={index} />
  //               ))}
  //             </div> */}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
