// src/hooks/useFetchUserInfo.js
import { useContext, useEffect } from 'react';
import { AuthContext } from '../shared/context/auth_context';
import useHttpClient from '../shared/context/http_hook';

const useFetchUserInfo = () => {
    const { update } = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const responseData = await sendRequest('http://localhost:4000/api/users');
                if (responseData && responseData.user) {
                    const profilePicturePath = responseData.user.profilePicture;
                    const baseURL = 'http://localhost:4000/';
                    const profilePictureURL = `${baseURL}${profilePicturePath}`;

                    // console.log('Fetched user data:', responseData.user.firstname);
                    // console.log('Profile Picture URL:', profilePictureURL);

                    update({
                        username: responseData.user.username,
                        firstname: responseData.user.firstname,
                        lastname: responseData.user.lastname,
                        profilePicture: profilePictureURL,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserInfo();
    }, [sendRequest, update]);
};

export default useFetchUserInfo;
