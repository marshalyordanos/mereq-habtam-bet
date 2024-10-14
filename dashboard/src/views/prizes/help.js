/*
1) in sore.js file    
import prizesReducer from '../views/prizes/PrizesRedux' // import the prizes
    
    export const store = configureStore({
  reducer: {
     ......
    prizes: prizesReducer, // add the prizes here
    
  },
})


2) in LayoutRouting.jsx

import PrizesList from './views/prizes/PrizesList'
import PrizesDetail from './views/prizes/PrizesDetails'

<Route path='prizes' element={<PrizesList/>}/>
<Route path='prizes/:id' element={<PrizesDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(prizes, 'read'))&&getItem(Prizes,prizes,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const prizeRoute = require('./prizes/prizeRouter');

{
    path: '/prizes',
    route: prizeRoute,
  },

*/
    