import React from 'react';

// project imports
import Profile from './UserProfile';

import MainCard from 'ui-component/cards/MainCard';

// ==============================|| PROFILE 3 ||============================== //

const Profile3 = () => (
    <MainCard title="Perfil de usuario">
        <div>
            <Profile />
        </div>
    </MainCard>
);

export default Profile3;
