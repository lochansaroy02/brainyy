import { useIsOpenStore } from "../utils/store"
import { Button } from "./ui/Button"
import PlusIcon from "./ui/icons/PlusIcon"
import ShareIcon from "./ui/icons/ShareIcon"

const Header = () => {

    // const { setIsOpen, isOpen } = useIsOpenStore();


    return (
        <div className="w-full fixed bg-purple-200 h-12  z-10  ">
            <div className="flex justify-between  items-center  h-full px-6  ">
                <div>
                    Logo
                    {/* <img src="" alt="" /> */}
                </div>

            </div>
        </div>
    )
}

export default Header