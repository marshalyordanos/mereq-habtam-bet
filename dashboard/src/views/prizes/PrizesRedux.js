
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import PrizesService from './PrizesService';


    export const searchPrizes = createAsyncThunk(
        "prizes/searchPrizes",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().prizes.query; // Access state directly

            const res = await PrizesService.searchPrize({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const prizesSlice = createSlice({
    name: 'prizes',
    initialState:{
        query:{
            searchText:'',
            page:1,
            limit:5,
            sort:'',
            order:''
        }
    },
    reducers: {
        updatePrizesState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },

    })

    export const { updatePrizesState } = prizesSlice.actions

    export default prizesSlice.reducer
    export const prizesSearchText = (state) => state.prizes.query.searchText;
    export const prizesPage = (state)=>state.prizes.query.page
    export const prizesLimit = (state)=>state.prizes.query.limit
    export const prizesSort = (state)=>state.prizes.query.sort
    export const prizesQuery = (state)=>state.prizes.query


    
    