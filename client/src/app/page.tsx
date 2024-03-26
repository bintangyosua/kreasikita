import Navbar from "@/components/home/Navbar";
import Cloud from "@/components/svgs/Cloud";
import HeroImage from "@/components/svgs/HeroImage";
import Search from "@/components/svgs/Search";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-purple text-white relative">
        <div className="container mx-auto">
          <div className="flex justify-between pt-20">
            <div className="flex flex-col gap-6 w-3/5">
              <h2 className="text-6xl font-extrabold">
                <span>Dukung Bakat,</span>
                <br />
                <span>Ciptakan Perubahan</span>
              </h2>
              <h3 className="text-3xl font-bold">#HarmoniKarya</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 bg-white py-3 px-5 rounded-3xl">
                  <Search stroke="#000" size={30} />
                  <input
                    className="w-full border-none active:border-none outline-none text-black"
                    type="text"
                    placeholder="Mencari kreator berdasarkan username"
                  />
                </div>
                <div className="flex justify-center gap-3">
                  <a href="#">Developer</a>
                  <a href="#">Youtuber</a>
                  <a href="#">Musisi</a>
                  <a href="#">Cosplayer</a>
                </div>
              </div>
            </div>
            <div className="w-3/5 flex justify-end">
              {/* <HeroImage /> */}
              <img src="/images/hero-image.png" alt="" className="h-[26rem]" />
            </div>
          </div>
        </div>
      </div>
      <Cloud />
      <div className="absolute z-10 top-[37rem] left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="shadow-md flex justify-center items-center w-2/3 bg-white rounded-xl">
          <div className="p-10 text-center w-1/3">
            <h4 className="text-lg font-bold">Jumlah</h4>
            <span>Kreator</span>
          </div>
          <div className="p-10 text-center w-1/3">
            <h4 className="text-lg font-bold">Jumlah</h4>
            <span>Kreator</span>
          </div>
          <div className="p-10 text-center w-1/3">
            <h4 className="text-lg font-bold">Jumlah</h4>
            <span>Kreator</span>
          </div>
        </div>
      </div>
      <main></main>
    </>
  );
}
