import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    User : null ,
    loading : false ,
    listing : [] ,
    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

        signUpStart : (state)=>{

            state.loading = true 

        },
        signUpSuccess : (state,action)=>{

            state.loading = false ,
            state.User = action.payload  

        },
        signInFailure : (state)=>{

            state.loading = false 
        },
        updateProfileStart : (state)=>{

            state.loading = true 
        },
        updateProfileSuccess: (state,action)=>{

            state.User = action.payload
            state.loading = false ;
        },
         updateProfilesFailure: (state)=>{


            state.loading = false ;
        },
        deleteUserStart:(state)=>{

            state.loading = true ;

        },
         deleteUserSuccess:(state)=>{

            state.loading = false ;
            state.User = null 
        },
         deleteUserFailure:(state)=>{

            state.loading = false 

        },
        signOutUser : (state)=>{

            state.User = null 
        },
        userListing : (state,action)=>{

            state.listing = action.payload ;

        } , 
        deleteListing:(state,action)=>{

            state.listing = state.listing.filter((list)=> list._id !== action.payload)
        } ,
       


   
   
  },
})

export const { signUpStart ,signUpSuccess , signInFailure ,updateProfileStart , updateProfileSuccess , updateProfilesFailure , deleteUserStart ,deleteUserSuccess , deleteUserFailure , signOutUser ,
    userListing , deleteListing 
 } = userSlice.actions

export default userSlice.reducer