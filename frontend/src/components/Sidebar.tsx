import { BrainCircuit, FileText, LogOut, Twitter, Youtube } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSidebarStore } from "../utils/store"
import { Button } from "./ui/Button"

const Sidebar = () => {


    const { isOpen } = useSidebarStore()
    const data = [
        {
            id: 1, name: "Video", icon: <Youtube />
        },
        {
            id: 2, name: "Tweet", icon: <Twitter />
        },
        {
            id: 3, name: "Docs", icon: <FileText strokeWidth={1.5} />
        },
    ]
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div className={`lg:w-[20%] lg:translate-x-0 
       ${isOpen ? 'translate-x-0' : '-translate-x-48'} 
       z-40
         transition-all duration-300 ease-in-out text-neutral-100 lg:flex  fixed flex-col items-start h-screen justify-between  px-4 py-8  bg-neutral-900  `}>

            <div className="flex flex-col gap-2    ">
                <div onClick={() => { navigate("/") }} className=" flex  cursor-pointer items-center   gap-2 mb-4">
                    <span className="text-2xl"><BrainCircuit className="size-10" /> </span>
                    <h1 className="text-2xl">Brainlyy</h1>
                </div>

                <div>

                    {
                        data && data.map((item, index) => (
                            <div key={index} className="flex font-light  gap-2 px-4 py-2  ">
                                <h2 className="">{item.icon}</h2>
                                <h1>{item.name}</h1>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div>
                <div>
                    <h1>
                    </h1>
                    <Button onclick={handleLogout} variant="primary" size="sm" text="logout" endIcon={<LogOut size={"15px"} />} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar