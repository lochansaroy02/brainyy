

const Selected = ({ value, onChange }) => {


    return (
        <select
            value={value}
            onChange={onChange}
            className="px-2 py-1  text-neutral-800 bg-neutral-300 focus:border-0 border rounded-md shadow-sm"
        >
            <option value="">Select an option</option>
            <option value="video">Video</option>
            <option value="tweet">Tweet</option>
            <option value="doc">Document</option>
        </select>
    )
}

export default Selected