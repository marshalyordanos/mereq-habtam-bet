/*
1) in sore.js file    
import puzzlesReducer from '../views/puzzles/PuzzlesRedux' // import the puzzles
    
    export const store = configureStore({
  reducer: {
     ......
    puzzles: puzzlesReducer, // add the puzzles here
    
  },
})


2) in LayoutRouting.jsx

import PuzzlesList from './views/puzzles/PuzzlesList'
import PuzzlesDetail from './views/puzzles/PuzzlesDetails'

<Route path='puzzles' element={<PuzzlesList/>}/>
<Route path='puzzles/:id' element={<PuzzlesDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(puzzles, 'read'))&&getItem(Puzzles,puzzles,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const puzzleRoute = require('./puzzles/puzzleRouter');

{
    path: '/puzzles',
    route: puzzleRoute,
  },

*/
    