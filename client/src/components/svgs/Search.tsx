export default function Search({
  stroke,
  size,
}: {
  stroke: string;
  size: number;
}) {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5945 21.5824L31 31M24.7778 13.8889C24.7778 19.9027 19.9027 24.7778 13.8889 24.7778C7.87513 24.7778 3 19.9027 3 13.8889C3 7.87513 7.87513 3 13.8889 3C19.9027 3 24.7778 7.87513 24.7778 13.8889Z"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
