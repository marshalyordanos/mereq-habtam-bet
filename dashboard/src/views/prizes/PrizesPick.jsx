
    import React, { useEffect, useRef, useState } from 'react'
    import { useSearchParams } from 'react-router-dom'
    import prizesService from './PrizesService';
    import CommonTable from '../../components/commons/CommonTable';
    import { ButtonStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import { Divider, Input } from 'antd';
    import { searchPrizes, updatePrizesState, prizesSearchText } from './PrizesRedux';//** */
    import { useDispatch, useSelector } from 'react-redux'; /*** */

    
    const PrizesPick = ({setIsModalOpen,selectHandler}) => {
    const [prizesData, setPrizesData] = useState([])
    const [total, setTotal] = useState()
    const [searchParams,setSearchParams] = useSearchParams()
    const dispatch = useDispatch(); /*** */
    const searchText = useSelector(prizesSearchText); //** */
    
    
    const [loading, setLoading] = useState();
    const [prizesSelection, setPrizesSelection] = useState([])
    const delayTimerRef = useRef(null);
    
    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updatePrizesState({ page: page, limit: limit }))

        searchData();
    }, [])

    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchPrizes());
            setPrizesData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        dispatch(updatePrizesState({ page: page, limit: limit, searchText: value }))
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = setTimeout(() => {


            searchData()
        }, 500);


    }

    const handlePagination = (page, pageSize) => {
        
        setSearchParams({page:page,limit:pageSize})
        searchData()
    }
    
    
     const columns = [
         
    
     
            {
                title: 'value',
                dataIndex: 'value',

            },
             
            {
                title: 'count',
                dataIndex: 'count',

            },
             
            {
                title: 'image',
                dataIndex: 'image',

            },
             
            {
                title: 'prize_type',
                dataIndex: 'prize_type',

            },
            
         
         ];
    
    
    
    
    return (

<div >
                <SearchInputStyle>
                    <Input onChange={searchHandler}
                        placeholder="Search"
                        value={searchText}
                        allowClear />
                </SearchInputStyle>


    <CommonTable
                rowSelectionType={"radio"}
                data={prizesData}
                columns={columns}
                setSelection={setPrizesSelection}
                handlePagination={handlePagination}
                total={total}
                loadding={loading}

            />
            <Divider style={{margin:15}}/>

<ButtonStyle>
     <button    onClick={()=>setIsModalOpen(false)} >
        cancel
      </button>
      <button disabled={prizesSelection.length==0} className={prizesSelection.length>0?'':'disable'} onClick={()=>selectHandler(prizesSelection[0])}>
        Return
      </button>
     </ButtonStyle>     

    </div>
  )
}
    
    

    export default PrizesPick
    