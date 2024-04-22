export default function BarListSidebar() {
  return (
    <div>
      {/* 酒吧種類及酒吧地區的select選單，使用basis-2/12給定固定的寬度 */}
      <div className="lg:basis-2/12 flex flex-col gap-4">
        <select className="select select-bordered select-sm w-[139px] rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white">
          <option disabled selected>
            酒吧區域
          </option>
          <option value="area1">松山區</option>
          <option value="area2">信義區</option>
          <option value="area3">大安區</option>
          <option value="area4">中山區</option>
          <option value="area5">中正區</option>
          <option value="area6">大同區</option>
          <option value="area7">萬華區</option>
          <option value="area8">文山區</option>
          <option value="area9">南港區</option>
          <option value="area10">內湖區</option>
          <option value="area11">士林區</option>
          <option value="area12">北投區</option>
        </select>
        <select className="select select-bordered select-sm w-[139px] rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white">
          <option disabled selected>
            酒吧種類
          </option>
          <option value="type1">運動酒吧</option>
          <option value="type2">音樂酒吧</option>
          <option value="type3">異國酒吧</option>
          <option value="type4">特色酒吧</option>
          <option value="type5">其他酒吧</option>
        </select>
      </div>
    </div>
  );
}
