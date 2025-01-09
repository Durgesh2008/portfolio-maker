import { FC } from "react"
import { IWrapper } from "./IWrapper"

const WrapperContainer: FC<IWrapper> = ({ children }) => {
    return (
        <div className='flex items-center justify-center h-screen bg-gradient-to-l from-blue-300 to-blue-700 font-satoshi'>
            {children}
        </div>
    )
}

export default WrapperContainer
