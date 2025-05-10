import axios from "axios";
import React, { useState } from "react";
import Selected from "./Selected";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import { useIsOpenStore } from "../utils/store";

const Create = () => {


    const [type, setType] = useState<string>('video');
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const { setIsOpen } = useIsOpenStore()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/content/create", {
                type, title, link
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
            setIsOpen(false)


        }

        // Add your form submission logic here
    }


    return (
        <div className='border gap-4  p-6 z-10 rounded-md text-neutral-100   bg-neutral-900  backdrop-blur-md border-neutral-400 flex items-center flex-col justify-center absolute right-24 text-wrap top-16 w-64'>
            <div className="flex  flex-col  gap-2">
                <Selected value={type} onChange={handleChange} />
                <form className="flex flex-col gap-2" onSubmit={handleSubmit} >

                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter title"
                    />
                    <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        placeholder="Enter link"
                    />
                    <Button variant="primary" size="md" text="submit" />
                </form>

            </div>
        </div >
    )
}

export default Create