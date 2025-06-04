import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen flex flex-col items-center gap-2  justify-center' >

            <h1 className='text-3xl text-white'>Second Brain</h1>
            <div>
                <Button text='signup' variant='primary' size='md' onclick={() => {
                    navigate("/signup")
                }} />
            </div>
        </div>
    )
}

export default Home