
const CreateDoc = () => {
    return (
        <div className="ml-[20%] p-8 ">
            <div className="flex flex-col items-center">

                <h1 className="text-white">Create document </h1>
            </div>
            <div className="flex flex-col gap-4 ">
                <input className="outline-0  text-neutral-200 w-1/2  focus:border-b border-b-neutral-300  text-4xl " placeholder="enter title" type="text" />
                <textarea style={{ resize: "none" }} placeholder="enter content " className="outline-0 h-[50vh] text-neutral-200 w-1/2    text-xl " />
            </div>
        </div>
    )
}

export default CreateDoc