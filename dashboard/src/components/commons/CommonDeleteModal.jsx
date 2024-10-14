import { Button, Modal } from 'antd'
import React from 'react'

const CommonDeleteModal = ({children,setIsModalOpen,handleDelete,isModalOpen,loading}) => {
  return (
    <Modal title="Delete" 
                        open={isModalOpen} 
                        onOk={handleDelete} 
                        footer={[
                            <Button key="back" onClick={()=>setIsModalOpen(false)}>
                              Cancel
                            </Button>,
                            <Button danger key="submit" type="primary" loading={loading} onClick={handleDelete}>
                              Delete
                            </Button>,
                          ]}
                        onCancel={()=>setIsModalOpen(false)}>
                                {children}
             </Modal>
  )
}

export default CommonDeleteModal