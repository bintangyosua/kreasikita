import Layout from "@/components/dashboard/layout";
import Section from "@/components/dashboard/section";
import { Input } from "@nextui-org/react";

export default function Page() {
  return (
    <Layout page="settings">
      <h1 className="text-5xl font-bold w-full lg:w-2/3 xl:1/2 mx-auto mb-3">
        Settings
      </h1>

      <Section>
        <div className="flex flex-col gap-3">
          <div
            style={{
              backgroundColor: "#5CCCC6",
            }}
            className="h-28 sm:h-32 lg:h-48 w-full rounded-t-3xl"></div>
          <div className="flex items-center justify-start px-5">
            <div>
              <div
                style={{
                  backgroundColor: "#5B5BD6",
                }}
                className="w-28 h-28 rounded-full ml-16 -mt-12"></div>
            </div>
            <div className="-mt-4 justify-between w-full pl-10 pr-2 hidden sm:flex"></div>
          </div>

          <div className="p-5">
            <Input type="email" label="Email" />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
