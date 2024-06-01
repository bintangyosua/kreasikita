export type TIconProps = {
  color: "purple" | "gray" | "black";
  size: number;
};

export default function IconLayout({
  color,
  size,
  children,
}: {
  color: "purple" | "gray" | "black";
  size: number | 35;
  children: (props: { fillColor: string }) => React.ReactNode;
}) {
  const fillColor =
    color === "purple" ? "#5B5BD6" : color === "gray" ? "#8F8F8F" : "#000000";

  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      {children({ fillColor })}
    </svg>
  );
}
