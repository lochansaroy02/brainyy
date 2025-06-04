import axios from "axios"
import { FileText, Link, Trash, Twitter, Youtube } from "lucide-react"
import { Tweet } from 'react-tweet'
import { useContentStore } from "../utils/store"



interface cardProps {
    type: "tweet" | "video",
    title: string
    link: string,
    id: string,
    description?: string

}
const Card = ({ type, title, link, id, description }: cardProps) => {

    const { content, setContent } = useContentStore();
    const handleDelete = async () => {

        try {
            const response = await axios.delete(`http://localhost:5000/content/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            const data = await response.data;

            const updatedData = content.filter((item) => item.id != id)
            setContent(updatedData)
        } catch (error) {

        }
    }


    return (
        <div className="  p-4  bg-neutral-900 text-neutral-100 shadow-neutral-500 rounded-lg w-fit h-fit   ">
            <div className="flex justify-between  px-4 py-2 rounded-t-lg  ">
                <div className="flex   gap-2 ">
                    {type == 'video' ? <Youtube /> : type === "tweet" ?
                        < Twitter /> : <FileText strokeWidth={1.5} />

                    }
                    <h1>{title}</h1>
                </div>
                <div className="flex gap-2 ">
                    {
                        //@ts-ignore
                        type !== "doc"
                        && <a href={link} target="_blank" rel="noopener noreferrer">
                            <Link />
                        </a>}
                    <Trash className="text-red-400 cursor-pointer" onClick={() => handleDelete()} strokeWidth={2} />
                </div>
            </div>


            <div className="w-fit">
                {type === "tweet" ? (
                    <div className="dark">
                        <Tweet  id={link.split("/status/")[1]} />
                    </div>
                ) : type === "video" ? (
                    <div className="py-4 ">
                        <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
                        </iframe>
                    </div>
                ) :
                    (<div>
                        {
                            <h1>
                                {description}
                            </h1>
                        }
                    </div>)

                }


            </div>

            <div>

            </div>
        </div>
    )
}

export default Card