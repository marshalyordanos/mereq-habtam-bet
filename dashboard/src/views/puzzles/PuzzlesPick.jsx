
    import React, { useEffect, useRef, useState } from 'react'
    import { useSearchParams } from 'react-router-dom'
    import puzzlesService from './PuzzlesService';
    import CommonTable from '../../components/commons/CommonTable';
    import { ButtonStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import { Divider, Input } from 'antd';
    import { searchPuzzles, updatePuzzlesState, puzzlesSearchText } from './PuzzlesRedux';//** */
    import { useDispatch, useSelector } from 'react-redux'; /*** */

    
    const PuzzlesPick = ({setIsModalOpen,selectHandler}) => {
    const [puzzlesData, setPuzzlesData] = useState([])
    const [total, setTotal] = useState()
    const [searchParams,setSearchParams] = useSearchParams()
    const dispatch = useDispatch(); /*** */
    const searchText = useSelector(puzzlesSearchText); //** */
    
    
    const [loading, setLoading] = useState();
    const [puzzlesSelection, setPuzzlesSelection] = useState([])
    const delayTimerRef = useRef(null);
    
    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updatePuzzlesState({ page: page, limit: limit }))

        searchData();
    }, [])

    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchPuzzles());
            setPuzzlesData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        dispatch(updatePuzzlesState({ page: page, limit: limit, searchText: value }))
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
                title: 'name',
                dataIndex: 'name',

            },
             
            {
                title: 'is_rare',
                dataIndex: 'is_rare',
                render: (text, recored) => {
                    return recored.is_rare ? <p>true</p> : <p>false</p>
                },
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
                data={puzzlesData}
                columns={columns}
                setSelection={setPuzzlesSelection}
                handlePagination={handlePagination}
                total={total}
                loadding={loading}

            />
            <Divider style={{margin:15}}/>

<ButtonStyle>
     <button    onClick={()=>setIsModalOpen(false)} >
        cancel
      </button>
      <button disabled={puzzlesSelection.length==0} className={puzzlesSelection.length>0?'':'disable'} onClick={()=>selectHandler(puzzlesSelection[0])}>
        Return
      </button>
     </ButtonStyle>     

    </div>
  )
}
    
    

    export default PuzzlesPick
    