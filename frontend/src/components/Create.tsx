import axios from "axios";
import React, { useState } from "react";
import { useIsOpenStore, useModalOpen } from "../utils/store";
import Selected from "./Selected";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import { CircleX } from "lucide-react";

const Create = () => {
    const { isModalOpen, setIsModalOpen } = useModalOpen();


    const [type, setType] = useState<string>('video');
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [desc, setDesc] = useState<string>("");
    const { setIsOpen } = useIsOpenStore()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/content/create", {
                type, title, link, desc
            }, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });

            const data = response.data
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setType('video');
            setTitle('');
            setLink('');
            setDesc('')
            setIsOpen(false)


        }

        // Add your form submission logic here
    }


    return (
        <div className="absolute  flex flex-col  justify-center items-center backdrop-blur-sm bg-black/40 z-40 w-full h-full">

            <div className="bg-neutral-800 bg-opacity-90 w-[75%] h-[75%] flex flex-col justify-center items-center p-4 rounded-xl shadow-lg">
                <button onClick={() => {
                    setIsModalOpen(!isModalOpen)
                }} className="absolute top-10 right-[169px] p-2 cursor-pointer hover:bg-neutral-700 transition-all  ease-in-out duration-300 rounded-full ">
                    <CircleX className="text-neutral-300 " />
                </button>

                <div className=" h-full flex flex-col  justify-center  gap-4   w-[70%] p-10">


                    <Selected value={type} onChange={handleChange} />


                    <form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit} >

                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter title"
                        />
                        {type != "doc" && <Input
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            type="text"
                            placeholder="Enter link"
                        />
                        }
                        {type === "doc" && <textarea
                            className="bg-neutral-300 border border-neutral-300 h-32 resize-none text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Enter Description"
                        />}
                        <div className="mt-12 ">
                            <Button variant="primary" size="md" text="submit" />
                        </div>
                    </form>
                </div>

            </div>
        </div >
    )
}

export default Create