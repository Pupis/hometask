/*jshint strict:false, esversion: 9, node: true */

module.exports = reducer;

function reducer(state = { files: [] }, action) {
    switch (action.type) {
        case 'readDir':
            return  {
                files: action.payload
            };
        case  'refreshList':
            return {
                ...state,
                files: action.payload
            };
        default:
            return state;
    }
}
