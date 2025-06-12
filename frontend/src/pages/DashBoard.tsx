
import axios from 'axios'
import { Menu, Pen } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Create from '../components/Create'
import ShareLink from '../components/ShareLink'
import Sidebar from '../components/Sidebar'
import { Button } from '../components/ui/Button'
import ShareIcon from '../components/ui/icons/ShareIcon'
import { useContentStore, useModalOpen, useShareLinkStore, useSidebarStore } from '../utils/store'

const DashBoard = () => {
    const { isModalOpen, setIsModalOpen } = useModalOpen()
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
    const { setLink } = useShareLinkStore();
    const { content: data } = useContentStore();
    const { toggleSidebar, isOpen } = useSidebarStore()

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

    const handleClick = () => {
        toggleSidebar()
    }

    // console.log(data)
    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])



    return (

        <div className=' bg-neutral-800 relative'>

            <div className=' absolute left-0 right-0  bottom-0  top-0'>
                {isModalOpen && < Create />}
            </div>
            <div className=' flex   relative  lg:h-screen '>
                <Sidebar />
                <div className='lg:w-[80%] absolute mt-8  px-4 right-0 h-screen bg-neutral-800 '>

                    <div className="  flex justify-between lg:px-0 px-4   ">
                        <div className='lg:opacity-0 '>
                            <button onClick={handleClick}>
                                <Menu className='text-white' />
                            </button>
                        </div>
                        <div className='flex justify-between gap-4'>

                            <Button onclick={() => {
                                setIsModalOpen(!isModalOpen);
                                console.log(isModalOpen)
                            }} variant='primary' size='sm' text='create ' startIcon={<Pen size={"14px"} />} />

                            {isShareOpen && <ShareLink />}
                            {isShareOpen == true ?
                                <Button onclick={handleShare} variant="secondary" size="sm" text="Share"
                                    startIcon={<ShareIcon size="md" />}
                                /> : <Button onclick={handleShare} variant="secondary" size="sm" text="Shared"
                                    startIcon={<ShareIcon size="md" />}
                                />
                            }
                        </div>
                    </div>


                    <div onClick={() => {
                        { isOpen && toggleSidebar() }
                    }} className=' lg:h-[50%]  ml-16  lg:ml-0 mt-4 lg:grid-cols-3  grid grid-cols-1 gap-2 '>
                        {
                            data.map(({ type, title, link, _id, desc }, index) => {
                                return (

                                    <Card key={index} type={type} title={title} link={link} id={_id} description={desc} />
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