
import axios from 'axios'
import { useState } from 'react'
import { useContent } from '../api/UseContent'
import Card from '../components/Card'
import Create from '../components/Create'
import ShareLink from '../components/ShareLink'
import Sidebar from '../components/Sidebar'
import { Button } from '../components/ui/Button'
import PlusIcon from '../components/ui/icons/PlusIcon'
import ShareIcon from '../components/ui/icons/ShareIcon'
import { useContentStore, useIsOpenStore, useShareLinkStore } from '../utils/store'
import { Pen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useIsOpenStore()
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

    const { setLink } = useShareLinkStore();

    const handleOpen = async () => {
        setIsOpen(!isOpen)
    }

    const { content: data } = useContentStore();
    useContent();

    const handleShare = async () => {
        setIsShareOpen(!isShareOpen)
        try {
            if (isShareOpen == true) {
                const response = await axios.post("http://localhost:5000/brain/share", {
                    share: isShareOpen
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                const data = response.data
                setLink(data.data)
            } else {
                setIsShareOpen(true)
            }

        }
        catch (error) {
            console.log(error);
        }
    }


    return (

        <div className=' bg-neutral-800'>
            {isOpen && <Create />}
            <div className=' flex   relative  h-screen '>
                <div className='w-[80%] absolute mt-8  px-4 right-0 h-screen bg-neutral-800 '>

                    <div className="flex justify-end gap-4   ">
                        <Button onclick={() => {
                            navigate("/create")
                        }} variant='primary' size='sm' text='create ' startIcon={<Pen size={"14px"} />} />
                        <Button onclick={handleOpen} variant="primary" size="sm" text="Add"
                            startIcon={<PlusIcon size="md" />}
                        />

                        {isShareOpen && <ShareLink />}
                        {isShareOpen == true ?
                            <Button onclick={handleShare} variant="secondary" size="sm" text="Share"
                                startIcon={<ShareIcon size="md" />}
                            /> : <Button onclick={handleShare} variant="secondary" size="sm" text="Shared"
                                startIcon={<ShareIcon size="md" />}
                            />
                        }
                    </div>


                    <div className=' h-[50%]  mt-4  grid grid-cols-3 gap-2 '>
                        {
                            data.map(({ type, title, link, _id }, index) => {
                                return (

                                    <Card key={index} type={type} title={title} link={link} id={_id} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashBoard