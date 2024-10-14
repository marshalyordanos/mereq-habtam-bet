
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import PuzzlesService from './PuzzlesService';


    export const searchPuzzles = createAsyncThunk(
        "puzzles/searchPuzzles",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().puzzles.query; // Access state directly

            const res = await PuzzlesService.searchPuzzle({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const puzzlesSlice = createSlice({
    name: 'puzzles',
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
        updatePuzzlesState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },

    })

    export const { updatePuzzlesState } = puzzlesSlice.actions

    export default puzzlesSlice.reducer
    export const puzzlesSearchText = (state) => state.puzzles.query.searchText;
    export const puzzlesPage = (state)=>state.puzzles.query.page
    export const puzzlesLimit = (state)=>state.puzzles.query.limit
    export const puzzlesSort = (state)=>state.puzzles.query.sort
    export const puzzlesQuery = (state)=>state.puzzles.query


    
    