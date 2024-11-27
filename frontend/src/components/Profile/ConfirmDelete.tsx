import React from 'react';
import Button from '../../ui/Button';
import axios from 'axios';
import checkToken from '../../util/checkToken';
import { useNavigate } from 'react-router-dom';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

interface IConfirmDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

const ConfirmDelete: React.FC<IConfirmDeleteProps> = ({ isOpen, onClose, userId }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            const token = checkToken();
            const response = await axios.post(
                `${serverUrl}/api/v1/user/deleteAccount`,
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response) {
                alert('Error deleting your account');
                return;
            }

            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-w-full bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Confirm Deletion
                </h2>
                <p className="text-gray-700 text-center mb-8">
                    Are you sure you want to delete your account? This action is
                    irreversible and will remove all associated data.
                </p>
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
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
