import { GenericCardProps } from 'types';
import { PostDataType, UserProfile, Profile, UserType, ProfileType, ProviderType, ApprovalProfileType } from 'types/user-profile';

export interface FollowerCardProps {
    avatar: string;
    follow: number;
    location: string;
    name: string;
}

export interface FriendRequestCardProps extends Profile {
    mutual: number;
}

export interface FriendsCardProps {
    avatar: string;
    location: string;
    name: string;
}

export interface UserProfileCardProps extends UserProfile {
    profile: string;
}

export interface UserSimpleCardProps {
    avatar: string;
    name: string;
    status: string;
}

export interface UserStateProps {
    usersS1: UserProfile[];
    usersS2: UserProfileStyle2[];
    followers: FollowerCardProps[];
    friendRequests: FriendRequestCardProps[];
    friends: FriendsCardProps[];
    gallery: GenericCardProps[];
    posts: PostDataType[];
    detailCards: UserProfile[];
    simpleCards: UserSimpleCardProps[];
    profileCards: UserProfileCardProps[];
    error: object | string | null;
    loading: boolean;
    usersList: UserType[];
    currentUser?: UserType;
    loadingEditInfo: boolean;
    profiles: ProfileType[];
    providers: ProviderType[];
    approvalProfiles: ApprovalProfileType[];
    fetching: boolean;
}

export type UserProfileStyle2 = {
    image: string;
    name: string;
    designation: string;
    badgeStatus: string;
    subContent: string;
    email: string;
    phone: string;
    location: string;
    progressValue: string;
};

export type AuthStateProps = {
    userName?: string;
    error: object | string | null;
};

export type ProfileStateProps = {
    error: object | string | null;
    loading: boolean;
    fetching: boolean;
    profiles: ProfileType[];
};
