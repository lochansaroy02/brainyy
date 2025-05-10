
interface InputProps {
    value?: string | number | readonly string[] | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type?: string;
}

const Input = ({ value, onChange, placeholder, required, type }: InputProps) => {


    return (
        <input
            value={value}
            onChange={onChange}
            className="bg-neutral-300 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            placeholder={placeholder}
            required={required}
            type={type}
        />
    )
}

export default Input