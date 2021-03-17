

export type DialogsType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}
export type StoreType = {
    _state: StateType
    getState: () => StateType
    updateNewPostText: (newText: string) => void
    addPostToState: () => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType

export type AddPostActionType = {
    type: "ADD-POST"
    newPost: string
}

export type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW_POST-TEXT"
    newText: string
}

let store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Петя"},
                {id: 2, name: "Ваня"},
                {id: 3, name: "Маня"},
                {id: 4, name: "Миша"},
                {id: 5, name: "Кола"},
            ],
            messages: [
                {id: 1, message: "Привет, как дела?"},
                {id: 2, message: "Хехей!"},
                {id: 3, message: "Как твой прогресс?"},
                {id: 4, message: "Какую музыку случаешь?"},
                {id: 5, message: "Как твоя собака?"},
            ]
        },
        profilePage: {
            posts: [
                {id: 1, message: "Hello, how are you?", likesCount: 23},
                {id: 2, message: "Its my first post", likesCount: 5}
            ],
            newPostText: ""
        }
    },
    _callSubscriber () {
        console.log("State was changed")
    },

    getState() {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer; // (наблюдатель) - паттерн
    },

    addPostToState () {
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._callSubscriber()
    },
    updateNewPostText (newText: string) {

        this._state.profilePage.newPostText = newText
        this._callSubscriber()
    },

    dispatch(action) {
        if (action.type === "ADD-POST") {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ""
            this._callSubscriber()
        } else if (action.type === "UPDATE-NEW_POST-TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        }
    }


}

export default store;

//
// let rerenderEntireTree = () => {
//     console.log("State was changed")
// }



// export let state: StateType = {
//     dialogsPage: {
//         dialogs: [
//             {id: 1, name: "Петя"},
//             {id: 2, name: "Ваня"},
//             {id: 3, name: "Маня"},
//             {id: 4, name: "Миша"},
//             {id: 5, name: "Кола"},
//         ],
//         messages: [
//             {id: 1, message: "Привет, как дела?"},
//             {id: 2, message: "Хехей!"},
//             {id: 3, message: "Как твой прогресс?"},
//             {id: 4, message: "Какую музыку случаешь?"},
//             {id: 5, message: "Как твоя собака?"},
//         ]
//     },
//     profilePage: {
//         posts: [
//             {id: 1, message: "Hello, how are you?", likesCount: 23},
//             {id: 2, message: "Its my first post", likesCount: 5}
//         ],
//         newPostText: ""
//     }
// }

// window.state = state;

// export const addPostToState = () => {
//     const newPost: PostsType = {
//         id: new Date().getTime(),
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = ""
//     rerenderEntireTree()
// }

// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree()
// }
//
// export const subscribe = (observer: () => void) =>  {
//     rerenderEntireTree = observer; // (наблюдатель) - паттерн
// }



