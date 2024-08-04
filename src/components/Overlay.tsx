interface Props {
    children: JSX.Element
    colorStyle: string
}


export function Overlay({ children, colorStyle }: Props) {
    return (
        <div className={"w-full h-full flex justify-center " + colorStyle}>
            {children}
        </div>
    )
}