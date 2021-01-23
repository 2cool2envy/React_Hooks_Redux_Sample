const iState = {
    books: [],
    sessionBooks: [],
    cart: []
};


const reducer = (state = iState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                books: action.payload,
            }
        case 'SET_SESSION_BOOKS':
            return {
                ...state,
                sessionBooks: action.payload,
            }
        case 'ADD_CARD':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'SEARCH_TEXT':
            const text = action.payload;
            console.log('text is ', state.sessionBooks);
            const arr = state.sessionBooks.filter((val) => val.authors.toLowerCase().includes(text.toLowerCase()))
            return {
                ...state,
                sessionBooks: arr,
                cart: [...state.cart, action.payload]
            }
        case 'RESET': 
        console.log('state :',state)
        return {
            ...state,
            sessionBooks: state.books.slice(0, 25)
        }
        default: return state
    }
}
export default reducer;