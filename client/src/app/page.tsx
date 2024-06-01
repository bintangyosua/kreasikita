"use server";

import Footer from "@/components/home2/footer";
import Hero from "@/components/home2/hero";
import Navbar from "@/components/home2/navbar";
import Reason from "@/components/home2/reason";
import Stats from "@/components/home2/stats";
import Testimoni from "@/components/home2/testimoni";
import HomeLayout from "@/components/layouts/home-layout";
import PostLayout from "@/components/layouts/post-layout";
import SwiperLayout from "@/components/layouts/swiper-layout";
import Icon from "@/components/svgs/Icon";
import KreasiKita from "@/components/svgs/KreasiKita";

const testimonis: {
  text: string;
  imgURL: string;
  name: string;
  title: string;
}[] = [
  {
    name: "Mythia Batford",
    imgURL:
      "https://trakteer.id/storage/images/avatar/ava-bbBYUhey9xlLSgSIynfq9kLU6vU8WoOb1635073343.png",
    text: "Saya berterima kasih kepada kreasikita sudah membantu para kreator untuk mendapatkan apresiasi lebih berupa donasi. Tetap sukses kreasikita! Thank you for all of your hardworks!",
    title: "Vtuber/Youtuber",
  },
  {
    name: "Clarissa Punipun",
    imgURL:
      "https://cdn.inflact.com/media/410615617_327691866843612_2963492917471135548_n.heic?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F410615617_327691866843612_2963492917471135548_n.heic%3Fstp%3Ddst-jpg_e35_p1080x1080%26_nc_ht%3Dscontent.cdninstagram.com%26_nc_cat%3D100%26_nc_ohc%3D9zqIpSvELHIAb7dYaXg%26edm%3DAPs17CUBAAAA%26ccb%3D7-5%26oh%3D00_AfD0BOB5-mBqpzFoxgLrwEM9QogcTKqUTmXIamjmrcGmew%26oe%3D6620A2AA%26_nc_sid%3D10d13b&time=1713024000&key=73b4505e7a78a4457209bf7c442a55fc",
    text: "Sejauh ini sudah sangat terbantu dengan UI/UX dan fitur2 di Trakteer ^^ Semoga kedepannya makin banyak fitur yang bisa membantu kreator2 makin berkembang ^^",
    title: "Cosplayer, Youtuber",
  },
];

export default async function Page() {
  return (
    <HomeLayout>
      <>
        <Hero />
        <Stats />
        <section className="flex flex-col items-center w-full md:w-2/3 justify-center mx-auto gap-6">
          <h2 className="mx-auto text-3xl sm:text-4xl md:text-5xl font-bold sm:text-center">
            Tentang KreasiKita
          </h2>
          <KreasiKita size={100} color="black" />
          <p className="text-center text-lg">
            Ad purto posse essent has. Case vide reformidans vim ei, laudem
            fabulas abhorreant an vim. Eu mel ipsum noster, ne mel aliquam
            corrumpit, dicta liber copiosae nec id. Suavitate consequuntur ea
            eam. Pro id mollis persecuti, eu autem velit nemore mel.
          </p>
        </section>
        <Reason />
        {/* <PostLayout></PostLayout> */}
        <div>
          <SwiperLayout>
            {testimonis.map((value, key) => (
              <Testimoni
                key={key}
                name={value.name}
                imgURL={value.imgURL}
                text={value.text}
                title={value.title}
              />
            ))}
          </SwiperLayout>
        </div>
      </>
    </HomeLayout>
  );
}
