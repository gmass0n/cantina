import React, { createContext, useCallback, useContext } from 'react';

import { api } from '~/services';

interface IUpdatePasswordData {
  password: string;
  oldPassword: string;
}

interface IProfileData {
  name: string;
  email: string;
  avatar: string | null;
}

interface ProfileContextData {
  updateProfile(profileData: IProfileData): Promise<void>;
  loadProfile(): Promise<IProfileData>;
  updatePassword(passwordData: IUpdatePasswordData): Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData
);

const ProfileProvider: React.FC = ({ children }) => {
  async function loadProfile(): Promise<IProfileData> {
    const response = await api.get('profile');

    const { name, email, avatar } = response.data;

    return {
      name,
      email,
      avatar,
    };
  }

  const updateProfile = useCallback(async (profileData: IProfileData) => {
    await api.put('profile', profileData);
  }, []);

  const updatePassword = useCallback(
    async (passwordData: IUpdatePasswordData) => {
      await api.patch('profile/password', passwordData);
    },
    []
  );

  return (
    <ProfileContext.Provider
      value={{ loadProfile, updateProfile, updatePassword }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  return context;
}

export { ProfileProvider, useProfile };
