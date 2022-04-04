import React from "react";
import BackIcon from "../../assets/images/Back.png";
import SearchIcon from "../../assets/images/search.png";

interface Props {
  search: string;
}

function App(props: Props) {
  const { search } = props;
  return (
    <header className="flex fixed bg-black w-full justify-between items-center px-4 h-20 shadow-2xl z-50">
      <div className="flex flex-1 items-center">
        <div className="w-5">
          <img src={BackIcon} alt="back" className="" />
        </div>
        <div className="text-2xl ml-4	">{search}</div>
      </div>
      <div className="w-6">
        <img src={SearchIcon} alt="search" />
      </div>
    </header>
  );
}

export default App;
