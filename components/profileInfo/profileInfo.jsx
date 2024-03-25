export default function ProfileInfo() {
  return (
    <>
      <div className="w-full basis-3/12 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row justify-center">
          {/* Profile avatar */}
          <div className="basis-3/12 flex items-center justify-center">
            <div className="avatar mr-3 ml-3">
              <div className="w-32 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          {/* Profile info */}
          <div className="basis-8/12 flex flex-col justify-between mx-1">
            <div className="flex items-center">UserId</div>
            <div className="flex flex-row justify-center items-center">
              <div className="basis-1/3">999貼文</div>
              <div className="basis-1/3">999追蹤者</div>
              <div className="basis-1/3">999追蹤中</div>
            </div>

            <div className="flex items-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              velit dolores accusamus rem delectus laboriosam dignissimos alias.
              Animi, maxime! Ipsa laboriosam asperiores incidunt reprehenderit
              laborum vitae eveniet facilis error perspiciatis!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
