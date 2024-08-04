import { Button } from "./Button";

interface Props {
    children: string,
    showButtons?: boolean
}

export function ShowError({ children, showButtons }: Props) {
    return (
        <div className="m-auto w-full p-4">
            <p className="text-gray-700 text-sm mb-4">
                <img src="/exclamation-mark.png" className="inline mr-1" width={15} alt="error"></img>
                {children}
            </p>
            {
                showButtons && (
                    <div>
                        <Button value="Delete File" colorStyles="bg-white hover:bg-gray-300 text-gray-700 border-gray-700" />
                        <Button value="Report Issue" colorStyles="bg-purple-500 hover:bg-purple-700 text-white border-purple-500"/>
                    </div>
                )
            }
            
        </div>
    )
}