import React, { useRef } from 'react'
import Button from '../../ui/Button';
import checkToken from '../../util/checkToken';
import axios from 'axios';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

interface IWallet {
    isOpen: boolean;
    onClose: () => void;
}

const Wallet: React.FC<IWallet> = ({ isOpen, onClose }) => {
    const money = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    const refreshPage = () => {
        window.location.reload()
    }

    const addMoney = async () => {
        try {
            const token = checkToken()
            const moneyToAdd = Number(money.current!.value)
            if (moneyToAdd <= 0) {
                alert("Money to add must be greater than 0.")
            }
            const response = await axios.post(`${serverUrl}/api/v1/user/addMoney`, { moneyToAdd }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                alert("Couldnt add money")
            }

            refreshPage()
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-w-full bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Add the amount you want to add.
                </h2>
                <input type="number" ref={money} />
                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={addMoney}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Wallet