

const Selected = ({ value, onChange }) => {


    const options = [
        { value: "", option: "Select an option " },
        { value: "video", option: "Video" },
        { value: "tweet", option: "Tweet" },
        { value: "doc", option: "Document" },
        { value: "linkedin", option: "LinkedIn" },

    ]

    return (
        <select
            value={value}
            onChange={onChange}
            className="px-2 py-1  text-neutral-800 bg-neutral-300 focus:border-0 border rounded-md shadow-sm"
        >
            {
                options.map((item) => (
                    <option className="bg-neutral-400" value={item.value}>{item.option}</option>
                ))
            }

        </select>
    )
}

export default Selected