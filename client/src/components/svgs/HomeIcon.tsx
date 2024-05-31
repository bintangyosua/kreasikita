import React from "react";

export default function HomeIcon({ color }: { color: "black" | "purple" }) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3379 4.80127C14.5137 4.62571 14.752 4.52709 15.0004 4.52709C15.2489 4.52709 15.4871 4.62571 15.6629 4.80127L26.5254 15.6638C26.6119 15.7533 26.7154 15.8246 26.8298 15.8737C26.9442 15.9228 27.0673 15.9486 27.1917 15.9496C27.3162 15.9506 27.4397 15.9269 27.5548 15.8797C27.67 15.8325 27.7747 15.7628 27.8627 15.6748C27.9506 15.5867 28.0202 15.482 28.0673 15.3667C28.1144 15.2515 28.138 15.128 28.1369 15.0036C28.1358 14.8791 28.1098 14.7561 28.0606 14.6417C28.0115 14.5274 27.94 14.424 27.8504 14.3375L16.9892 3.47502C16.728 3.21385 16.418 3.00668 16.0767 2.86534C15.7355 2.72399 15.3698 2.65125 15.0004 2.65125C14.6311 2.65125 14.2653 2.72399 13.9241 2.86534C13.5829 3.00668 13.2728 3.21385 13.0117 3.47502L2.14917 14.3375C2.05967 14.424 1.9883 14.5275 1.93922 14.6419C1.89014 14.7563 1.86434 14.8794 1.86331 15.0038C1.86229 15.1283 1.88607 15.2518 1.93326 15.367C1.98045 15.4821 2.05012 15.5868 2.13818 15.6748C2.22625 15.7627 2.33095 15.8323 2.44619 15.8794C2.56143 15.9265 2.68489 15.9501 2.80937 15.949C2.93385 15.9479 3.05685 15.9219 3.17121 15.8728C3.28556 15.8236 3.38898 15.7521 3.47542 15.6625L14.3379 4.80127Z"
        fill={color === "purple" ? "#5B5BD6" : "black"}
      />
      <path
        d="M15 6.79004L25.1987 16.9888C25.2362 17.0255 25.2742 17.0613 25.3125 17.0963V24.8438C25.3125 26.1375 24.2625 27.1875 22.9688 27.1875H18.75C18.5014 27.1875 18.2629 27.0888 18.0871 26.913C17.9113 26.7371 17.8125 26.4987 17.8125 26.25V20.625C17.8125 20.3764 17.7137 20.1379 17.5379 19.9621C17.3621 19.7863 17.1236 19.6875 16.875 19.6875H13.125C12.8764 19.6875 12.6379 19.7863 12.4621 19.9621C12.2863 20.1379 12.1875 20.3764 12.1875 20.625V26.25C12.1875 26.4987 12.0887 26.7371 11.9129 26.913C11.7371 27.0888 11.4986 27.1875 11.25 27.1875H7.03125C6.40965 27.1875 5.81351 26.9406 5.37397 26.5011C4.93443 26.0615 4.6875 25.4654 4.6875 24.8438V17.0963L4.80125 16.9888L15 6.79004Z"
        fill={color === "purple" ? "#5B5BD6" : "black"}
      />
    </svg>
  );
}
