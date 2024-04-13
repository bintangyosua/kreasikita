import React from "react";

type CrowdfundingType = {
  name: string;
  author: string;
  authorImgUrl: string;
  imgURL: string;
  percentage: number;
};

const crowdfundings: CrowdfundingType[] = [
  {
    name: "Help the Brice Family Recover from House Fire",
    author: "Clarissa Punipun",
    authorImgUrl:
      "https://cdn.inflact.com/media/410615617_327691866843612_2963492917471135548_n.heic?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F410615617_327691866843612_2963492917471135548_n.heic%3Fstp%3Ddst-jpg_e35_p1080x1080%26_nc_ht%3Dscontent.cdninstagram.com%26_nc_cat%3D100%26_nc_ohc%3D9zqIpSvELHIAb7dYaXg%26edm%3DAPs17CUBAAAA%26ccb%3D7-5%26oh%3D00_AfD0BOB5-mBqpzFoxgLrwEM9QogcTKqUTmXIamjmrcGmew%26oe%3D6620A2AA%26_nc_sid%3D10d13b&time=1713024000&key=73b4505e7a78a4457209bf7c442a55fc",
    imgURL:
      "https://images.gofundme.com/cdZ69K0MdPk1Q5U-ld-a4f4ReFI=/720x405/https://d2g8igdw686xgo.cloudfront.net/79426919_171276495682165_r.jpeg",
    percentage: 80,
  },
  {
    name: "Raih Pahala 2x Lipat! Sedekah tuk Anak Panti Yatim",
    author: "Mythia Bartford",
    authorImgUrl:
      "https://trakteer.id/storage/images/avatar/ava-bbBYUhey9xlLSgSIynfq9kLU6vU8WoOb1635073343.png",
    imgURL:
      "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Ff35f0a65-37c2-4e30-9aec-4f040ffd24b1.jpg%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=640&q=75",
    percentage: 120,
  },
  {
    name: "Help us Feed 150 orphaned children in our orphanag",
    author: "Minuettaro",
    authorImgUrl: "https://avatars.githubusercontent.com/u/60311483?v=4",
    imgURL:
      "https://images.gofundme.com/RbQeFjG68i_AToUAQuQN9RdlF3k=/720x405/https://d2g8igdw686xgo.cloudfront.net/77719905_1707385451197680_r.jpeg",
    percentage: 345,
  },
];

export default function PostLayout({ cfs }: { cfs: CrowdfundingType[] }) {
  return (
    <div className="mx-auto flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="sm:text-2xl font-semibold">Crowdfunding</h2>
        <a href="#">{`Explore More ->`}</a>
      </div>
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {crowdfundings.map((value, key) => (
          <Card key={key} cf={value} />
        ))}
      </div>
    </div>
  );
}

function Card({ cf }: { cf: CrowdfundingType }) {
  return (
    <div className="flex flex-col gap-3">
      <img src={cf.imgURL} alt={cf.name} className="rounded-lg" />
      <div className="flex gap-3 justify-start items-center">
        <div className="flex flex-col items-start justify-start h-full">
          <div
            className="rounded-full"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url('${cf.authorImgUrl}')`,
              height: "50px",
              width: "50px",
            }}></div>
        </div>
        <div className="w-full flex flex-col">
          <span className="text-lg font-semibold text-gray-900">{cf.name}</span>
          <span className="text-sm text-gray-800">{cf.author}</span>
          <span className="text-sm text-gray-700">
            {cf.percentage}% terkumpul
          </span>
        </div>
      </div>
    </div>
  );
}
