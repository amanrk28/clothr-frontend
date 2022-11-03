import React from "react";
import { Menu } from "./Menu";

interface BaseProps {
  title?: string;
  description?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Base: React.FC<BaseProps> = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="h-40 w-full flex flex-col items-center justify-center shadow-xl border-[0.02rem] border-gray-400 border-opacity-20 bg-black/20 rounded-md lg:rounded-xl backdrop-blur-lg">
      <div className="flex items-center">
        <a href="https://twitter.com/Amanrk28">
          <img
            className="cursor-pointer hover:scale-125 h-20 w-20 duration-300"
            src="/images/aman.png"
          />
        </a>
      </div>
    </footer>
  </div>
);

export default Base;
