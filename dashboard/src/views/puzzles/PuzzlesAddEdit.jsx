
    
import React, { useEffect, useState } from 'react'
import { Button, Divider, Dropdown, Form, Input, InputNumber, Select, Spin, Switch,DatePicker } from 'antd';
import styled from 'styled-components';
import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
import puzzlesService from './PuzzlesService';
import CommonModal from '../../components/commons/CommonModel';
import PuzzlesPick from './PuzzlesPick';
import dayjs from 'dayjs';
import CommonTable from '../../components/commons/CommonTable';
import {
  MoreOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
    const { Option } = Select;

    const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
    
    
    
    const PuzzlesEdit = ({setIsModalOpen,isModelOpen,mode,setMode,puzzlesData,searchData}) => {
      const [puzzlesData2, setPuzzlesData2] = useState([])

      const [form] = Form.useForm();
      const [switch2,setSwitch2] = useState("")
      const [loading,setLoading] = useState("")
      const [puzzlePick,setPuzzlePick] = useState(false)


    
    useEffect(()=>{
        const featchData = async()=>{
        try{

            const data = await puzzlesService.getPuzzle(mode);
            form.setFieldsValue({ puzzle: {...data,updatedAt:dayjs(data.updatedAt)} });
            
    
        }catch(err){
        }
        }
        if (mode==''){
        
        } else{
        
        featchData()
        }
    },[])


    const handleReset = () => {
        form.resetFields();
    }; 

    const puzzlePickHandler=(data)=>{
        console.log('puzzlePickHandler',data)
        
        setPuzzlePick(false)
        
    }


    const onAdd = async(e)=>{
      e.preventDefault();
        try{

        setLoading(true);

        const data = await puzzlesService.puzzlesDo({method:'add_list_to_puzzle',payload:{data:puzzlesData2}})
        setIsModalOpen(false)
        
        searchData()
        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    } 

    const onUpdate = async(datas)=>{
        
        try{

        setLoading(true);

        const data = await puzzlesService.updatePuzzle(datas.puzzle,mode)
        searchData()
        setIsModalOpen(false)
        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    }
    

    const onFinish = (values) => {
      console.log("===========")
        mode == ''? handleAddToList(values):onUpdate(values)
    };
    const handleAddToList = (e)=>{
      // e.preventDefault()
      setPuzzlesData2([{...form.getFieldsValue()?.puzzle,_id:new Date().getTime()},...puzzlesData2])
      handleReset()
    }
    
    
    const onClick = ({ key }, record) => {
      if (key == 'edit') {
        console.log("========",record)

        form.setFieldsValue({puzzle:record})
        const data = puzzlesData2.filter((puzzle)=>puzzle._id !== record._id)
        setPuzzlesData2(data)

      } else if (key === 'delete') {
        console.log("========",record)
          const data = puzzlesData2.filter((puzzle)=>puzzle._id !== record._id)
          setPuzzlesData2(data)
      }
  };
    const items = [
      {
          key: 'edit',
          label: (
              <Button type="text">Edit</Button>
          ),


      },
      {
          key: 'delete',
          label: (
              <Button type="text"> Delete</Button>
          ),
      },
      {
          key: '3',
          label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  3rd menu item
              </a>
          ),
      },
  ];
  
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
    <div>
      {/*******  picks **********/}
      {puzzlePick ? <CommonModal
        width={700}
        isModalOpen={puzzlePick}
        setIsModalOpen={setPuzzlePick}
      >
        <PuzzlesPick
          setIsModalOpen={setPuzzlePick}
          selectHandler={puzzlePickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setPuzzlePick(true)}>hhhhhh</button>
      
      
      
    <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {} }

        validateMessages={validateMessages}
      >
      
      

        
            <Form.Item
            className=' flex-1'
            name={['puzzle', 'name']}
            label="name"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
                <Form.Item name={['puzzle', 'is_rare']} label="is_rare" >
                    <Switch checked={switch2} onChange={(value)=>setSwitch2(value)} style={{background:switch2?'blue':'gray'}} />
                </Form.Item>
            
      
      
    {puzzlesData2.length>0 && <CommonTable
                    rowSelectionType={"checkbox"}
                    data={puzzlesData2}
                    columns={columns}
                    total={puzzlesData2.lenght}
                    loadding={loading}
                    type={true}

                />}

                <Divider/>
            
      
      <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)} >
            cancel
          </button>

          {mode?<button type='submit'  >
           Submit
          </button>:<button type='submit'  >
            Add List
          </button>}

          {!mode&&<button disabled={puzzlesData2.length==0} onClick={onAdd} className={puzzlesData2.length>0?"":'disable'} type='submit'  >
            Submit
          </button>}
        </ButtonStyle>
      </FormStyle>
    
      
       
      </div>
  )
    
    
  
   }  
   
   
  const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height:  50px;
  background-color: rgba(0,0,0,0.2);
  z-index: 100;
  display: flex;
  border-radius:  120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red; 
  }
 


`



export default PuzzlesEdit
    
    