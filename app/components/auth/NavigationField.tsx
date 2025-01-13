import { Link } from '@remix-run/react'
import React, { FC } from 'react'
import { navigationFieldProps } from './IAuth'

const NavigationField: FC<navigationFieldProps> = ({ title, mode, btnTxt }) => {
    return (
        <div>
            <div className="text-center">
                <h1 className="text-3xl  font-outfit font-bold mb-4">
                    Hello, Friend!
                </h1>
                <p className="text-sm mb-4">
                    {title}
                </p>
                <Link
                    to={mode === 'signin' ? '?mode=signup' : '/'}
                    className="font-outfit uppercase font-semibold text-white hover:underline">
                    {btnTxt}
                </Link>

            </div>
        </div>
    )
}

export default NavigationField
