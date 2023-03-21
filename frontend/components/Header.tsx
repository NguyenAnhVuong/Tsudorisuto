import Image from "next/image";
import UserMenu from "./UserMenu";

type Props = {};

const Header = (props: Props) => {
  const gotoTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <div className="flex items-center justify-between fixed p-4 py-3 shadow-md top-0 left-0 right-0 z-20 bg-white">
      <div className="flex items-center" onClick={gotoTop}>
        <Image
          src="/to_do_list.png"
          alt="Landscape picture"
          width={32}
          height={32}
        />
        <h2 className="text-xl font-semibold">Tsudorisuto</h2>
      </div>
      <div>
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
