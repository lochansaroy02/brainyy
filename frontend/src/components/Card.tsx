import axios from "axios"
import { Link, Trash, Twitter, Youtube } from "lucide-react"
import { Tweet } from 'react-tweet'
import { useContent } from "../api/UseContent"



interface cardProps {
    type: "tweet" | "video",
    title: string
    link: string,
    id: string

}
const Card = ({ type, title, link, id }: cardProps) => {

    const { refetch } = useContent();
    const handleDelete = async () => {

        try {
            const response = await axios.delete(`http://localhost:5000/content/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            })
            const data = await response.data;
            console.log(data);
            refetch();
        } catch (error) {

        }
    }


    return (
        <div className="  p-4  bg-neutral-900 text-neutral-100 shadow-neutral-500 rounded-lg w-fit h-fit   ">
            <div className="flex justify-between  px-4 py-2 rounded-t-lg  ">
                <div className="flex   gap-2 ">
                    {type == 'video' ? <Youtube /> :
                        <Twitter />}
                    <h1>{title}</h1>
                </div>
                <div className="flex gap-2 ">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <Link />
                    </a>
                    <Trash onClick={() => handleDelete()} color="red" strokeWidth={2} />
                </div>
            </div>
            <div className="w-fit">
                {type === "tweet" ? (
                    <Tweet id={link.split("/status/")[1]} />
                ) : type === "video" ? (
                    <div className="py-4 ">
                        <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
                        </iframe>
                    </div>
                ) : null}


            </div>
        </div>
    )
}

export default Card