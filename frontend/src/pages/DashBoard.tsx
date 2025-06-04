
import axios from 'axios'
import { Pen } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Create from '../components/Create'
import ShareLink from '../components/ShareLink'
import Sidebar from '../components/Sidebar'
import { Button } from '../components/ui/Button'
import ShareIcon from '../components/ui/icons/ShareIcon'
import { useContentStore, useModalOpen, useShareLinkStore } from '../utils/store'

const DashBoard = () => {
    const { isModalOpen, setIsModalOpen } = useModalOpen()
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
    const { setLink } = useShareLinkStore();
    const { content: data } = useContentStore();


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

    // console.log(data)
    useEffect(() => {
    }, [])


    return (

        <div className=' bg-neutral-800 relative'>

            <div className=' absolute left-0 right-0  bottom-0  top-0'>
                {isModalOpen && < Create />}
            </div>
            <div className=' flex   relative  h-screen '>
                <Sidebar />
                <div className='w-[80%] absolute mt-8  px-4 right-0 h-screen bg-neutral-800 '>

                    <div className="flex justify-end gap-4   ">
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


                    <div className=' h-[50%]  mt-4  grid grid-cols-3 gap-2 '>
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