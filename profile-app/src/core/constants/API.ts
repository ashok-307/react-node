export enum API {
    LOGIN = 'auth',
    REGISTER_USER = 'users',
    GET_PROFILE = 'profile/me',
    GET_CREATE_DELETE_PROFILE = 'profile',
    ADD_EDUCATION = 'profile/education',
    ADD_EXPERIENCE = 'profile/experience',
    DELETE_EXPERIENCE = 'profile/experience/',
    DELETE_EDUCATION = 'profile/education/',
    PROFILE_BY_USER_ID = 'profile/user/',
    GET_USER_REPOS = 'profile/github/',
    GET_POSTS = 'posts',
    Add_Like = 'posts/like/',
    Remove_Like = 'posts/dislike/',
    Post_Comment = 'posts/comment/'
}
