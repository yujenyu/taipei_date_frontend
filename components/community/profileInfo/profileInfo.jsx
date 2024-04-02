export default function ProfileInfo() {
  const mockData = {
    userId: 'UserId',
    posts: '999貼文',
    followers: '999追蹤者',
    following: '999追蹤中',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe velit dolores accusamus rem delectus laboriosam dignissimos alias. Animi, maxime! Ipsa laboriosam asperiores incidunt reprehenderit laborum vitae eveniet facilis error perspiciatis! ',
  };
  return (
    <>
      <div className="w-full basis-3/12 flex items-center justify-center px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          {/* Profile avatar */}
          <div className="basis-3/12 flex items-center justify-center">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          {/* Profile info */}
          <div className="basis-8/12 flex flex-col justify-between item-center gap-2">
            <div className="flex items-center">{mockData.userId}</div>
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="basis-1/3">{mockData.posts}</div>
              <div className="basis-1/3">{mockData.followers}</div>
              <div className="basis-1/3">{mockData.following}</div>
            </div>

            <div className="flex items-center">{mockData.bio}</div>
          </div>
        </div>
      </div>
    </>
  );
}
