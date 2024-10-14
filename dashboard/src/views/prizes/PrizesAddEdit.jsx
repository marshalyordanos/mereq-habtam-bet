
    
import React, { useEffect, useState } from 'react'
import { Button, Divider, Dropdown, Form, Input, InputNumber, Select, Spin, Switch,DatePicker } from 'antd';
import styled from 'styled-components';
import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
import prizesService from './PrizesService';
import CommonModal from '../../components/commons/CommonModel';
import PrizesPick from './PrizesPick';
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
    
    
    
    const PrizesEdit = ({setIsModalOpen,isModelOpen,mode,setMode,prizesData,searchData}) => {
      const [prizesData2, setPrizesData2] = useState([])

      const [form] = Form.useForm();
      const [switch2,setSwitch2] = useState("")
      const [loading,setLoading] = useState("")
      const [prizePick,setPrizePick] = useState(false)


    
    useEffect(()=>{
        const featchData = async()=>{
        try{

            const data = await prizesService.getPrize(mode);
            form.setFieldsValue({ prize: {...data,updatedAt:dayjs(data.updatedAt)} });
            
    
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

    const prizePickHandler=(data)=>{
        console.log('prizePickHandler',data)
        
        setPrizePick(false)
        
    }


    const onAdd = async(e)=>{
      e.preventDefault();
        try{

        setLoading(true);

        const data = await prizesService.prizesDo({method:'add_list_to_prize',payload:{data:prizesData2}})
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

        const data = await prizesService.updatePrize(datas.prize,mode)
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
      setPrizesData2([{...form.getFieldsValue()?.prize,_id:new Date().getTime()},...prizesData2])
      handleReset()
    }
    
    
    const onClick = ({ key }, record) => {
      if (key == 'edit') {
        console.log("========",record)

        form.setFieldsValue({prize:record})
        const data = prizesData2.filter((prize)=>prize._id !== record._id)
        setPrizesData2(data)

      } else if (key === 'delete') {
        console.log("========",record)
          const data = prizesData2.filter((prize)=>prize._id !== record._id)
          setPrizesData2(data)
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
    <div>
      {/*******  picks **********/}
      {prizePick ? <CommonModal
        width={700}
        isModalOpen={prizePick}
        setIsModalOpen={setPrizePick}
      >
        <PrizesPick
          setIsModalOpen={setPrizePick}
          selectHandler={prizePickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setPrizePick(true)}>hhhhhh</button>
      
      
      
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
            name={['prize', 'value']}
            label="value"
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
            
            <Form.Item
      
            name={['prize', 'count']}
            label="count"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
            className=' flex-1'
            name={['prize', 'image']}
            label="image"
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
            
                <Form.Item
            name={['prize', 'prize_type']}
            label="prize_type"
            className=' flex-1'
            rules={[
              {
                required: true,
                message: 'Please select prize_type!',
              },
            ]}
          >
            <Select
              className='border-gray-400 '
              placeholder="select your prize_type">
              <Option value="value1">Value1</Option>
              <Option value="value2">Value2</Option>
            </Select>
          </Form.Item>
            
      
      
    {prizesData2.length>0 && <CommonTable
                    rowSelectionType={"checkbox"}
                    data={prizesData2}
                    columns={columns}
                    total={prizesData2.lenght}
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

          {!mode&&<button disabled={prizesData2.length==0} onClick={onAdd} className={prizesData2.length>0?"":'disable'} type='submit'  >
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



export default PrizesEdit
    
    