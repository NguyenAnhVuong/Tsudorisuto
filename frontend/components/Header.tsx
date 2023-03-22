import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import UserMenu from "./UserMenu";

type Props = {};

const Header = (props: Props) => {
  const gotoTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex justify-center bg-white dark:bg-dark dark:text-white shadow-light">
      <div className="flex w-full lg:w-[1200px] items-center justify-between p-4 py-2">
        <div className="flex items-center" onClick={gotoTop}>
          <MdOutlinePlaylistAddCheck size={40} color="#5cb85c" />
          <h2 className="text-xl font-semibold dark:text-white">Tsudorisuto</h2>
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
