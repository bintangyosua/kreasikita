export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl w-full lg:w-3/3 xl:1/2 mx-auto mb-3">{children}</h1>
  );
}
