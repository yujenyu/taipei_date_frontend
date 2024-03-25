export default function ThemeCard() {
  return (
    <div className="w-full md:w-715 md:h-680 rounded-lg border border-primary p-4 flex flex-col justify-center items-center bg-gray-800">
      <img
        className="w-full h-60 md:h-auto md:w-auto mb-4"
        src="/theme.jpg"
        alt=""
      />
      <p className="text-center max-w-md md:max-w-full md:max-w-2xl mb-10">
        我以為我了解網站，但我真的了解網站嗎？仔細想想，我對網站的理解只是皮毛而已。網站的出現，必將帶領人類走向更高的巔峰。網站，到底應該如何實現。網站似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。世界需要改革，需要對網站有新的認知。畢達哥拉斯說過一句很有意思的話，別的動物也都具有智力、熱情，理性只有人類才有。這句話反映了問題的急切性。
      </p>
      <button className="w-40 py-1 my-2 md:w-60 md:py-2 bg-primary border-2 btn-primary border-primary rounded-full text-black">
        我要看電影
      </button>
    </div>
  );
}
