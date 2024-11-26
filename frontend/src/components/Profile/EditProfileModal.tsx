import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Button from '../../ui/Button';
import checkToken from '../../util/checkToken';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';


interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userDetails: {
        name: string;
        username: string;
    };
}

interface FormValues {
    name: string;
    username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userDetails }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            name: userDetails.name,
            username: userDetails.username,
        },
    });

    if (!isOpen) return null;

    const refreshPage = () => {
        //@ts-ignore
        window.location.reload(true)
    }

    const onSave = async (data: FormValues) => {
        try {
            const token = checkToken()

            const response = await axios.post(`${serverUrl}/api/v1/user/editProfile`, { data }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                alert("Error changing profile details")
            }

            alert("Profile details successfully changed")
            refreshPage()
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onSave(data)
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-w-full bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Username Input */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant='primary'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant='secondary'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
