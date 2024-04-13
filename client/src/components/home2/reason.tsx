import React from "react";
import Checklist from "../svgs/Checklist";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Reason() {
  return (
    <div className="flex flex-col gap-6 mx-auto mb-20 lg:w-4/6 rounded-[2rem] my-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 font-bold sm:text-center">
        <span>Didesain untuk kreator,</span>
        <br />
        <span className="text-gray-600">bukan untuk bisnis</span>
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <CardPoint text="Kita ngga panggil mereka pelanggan. Mereka itu <b>supporters/pendukung</b>."></CardPoint>
        <CardPoint
          text="Kamu punya <b>100% kepemilikan</b> atas pendukung mu. Kita ngga
            pernah kasih email ke mereka"></CardPoint>
        <CardPoint text="Kalau butuh bantuan atau mau minta saran untuk langsung jalan, boleh nih ngobrol sama <b>Customer Service</b>." />
        <CardPoint text="Bayarannya masuk langsung ke rekening bankmu, <b>no more nunggu 30 hari</b>." />
      </div>
    </div>
  );
}

function CardPoint({ text }: { text: string }) {
  return (
    <Box width="350px">
      <Card size="1">
        <Flex
          gap="3"
          align="center"
          className="flex flex-row items-center gap-3 justify-start">
          <div>
            <IoMdCheckmarkCircleOutline size={"40px"} className="w-[40px]" />
          </div>
          <Box>
            <Text
              as="div"
              size="2"
              weight="bold"
              dangerouslySetInnerHTML={{ __html: text }}></Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}
