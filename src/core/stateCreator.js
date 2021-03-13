export function stateCreator(rootReduser, initialState= {}){
    let state = rootReduser({...initialState}, {type:"_INIT_"}) 
    let listeners = []
    return{
        subscribe(fn){
            listeners.push(fn)
            return {
                unsubscribe(){
                    listeners.filter(l => l!==fn)
                }
            }

        },

        dispatch(action){
            state = rootReduser(state, action)
            listeners.forEach(l => l(state))

        },

        getState(){

            return  JSON.parse(JSON.stringify(state))
        }
    }
}