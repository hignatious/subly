
interface Props {
    value: string;
    colorStyles: string;
    onClick?: () => void;
}

export function Button(props: Props) {
    const { value, colorStyles, onClick } = props;
    return (
        <button
            className={"m-auto mx-1 text-sm font-semibold py-2 px-4 border border-solid rounded " + colorStyles}
            onClick={onClick ? () => onClick() : () => console.log("Todo: Implement function")}
        >
            {value}
        </button>
    )
} 