import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  DatePicker,
  Divider,
  Upload,
} from "antd";
import styled from "styled-components";
import {
  ButtonStyle,
  FlexStyle,
  FormStyle,
} from "../../components/commons/CommonStyles";
import prizesService from "./PrizesService";
import CommonModal from "../../components/commons/CommonModel";
import PrizesPick from "./PrizesPick";
import dayjs from "dayjs";

const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const PrizesEdit = ({
  setIsModalOpen,
  isModelOpen,
  mode,
  setMode,
  prizesData,
  searchData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [prizePick, setPrizePick] = useState(false);
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  useEffect(() => {
    const featchData = async () => {
      try {
        const data = await prizesService.getPrize(mode);
        form.setFieldsValue({
          prize: { ...data, initialDate: dayjs(data.initialDate) },
        });
        setSwitch2(data?.isBig);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data?.image,
          },
        ]);
      } catch (err) {}
    };
    if (mode == "") {
    } else {
      featchData();
    }
  }, []);

  const handleReset = () => {
    form.resetFields(); // Reset form fields
  };

  const prizePickHandler = (data) => {
    console.log("prizePickHandler", data);

    setPrizePick(false);
  };

  const onAdd = async (datas) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      console.log("datas", datas);
      formdata.append("count", datas.prize.count);
      formdata.append("prize_type", datas.prize.prize_type);
      formdata.append("value", datas.prize.value);
      formdata.append("initialDate", datas.prize.initialDate);
      formdata.append("prizeDuration", datas.prize.prizeDuration);
      formdata.append("isBig", datas.prize.isBig);

      if (fileList.length > 0) {
        if (fileList[0].originFileObj) {
          console.log("file: ", fileList);
          formdata.append("image", fileList[0].originFileObj);
        }
      }

      // data.append('email', formData.email);

      const data = await prizesService.createPrize(formdata);
      setIsModalOpen(false);
      searchData();

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onUpdate = async (datas) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      console.log("datas", datas);
      formdata.append("count", datas.prize.count);
      formdata.append("prize_type", datas.prize.prize_type);
      formdata.append("value", datas.prize.value);
      formdata.append("initialDate", datas.prize.initialDate);
      formdata.append("prizeDuration", datas.prize.prizeDuration);
      formdata.append("isBig", datas.prize.isBig);
      console.log(fileList, "list");
      if (fileList.length > 0 && fileList[0]?.uid != "-1") {
        if (fileList[0].originFileObj) {
          console.log("file: ", fileList);
          formdata.append("image", fileList[0].originFileObj);
        }
      }
      const data = await prizesService.updatePrize(formdata, mode);
      searchData();
      setIsModalOpen(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    mode == "" ? onAdd(values) : onUpdate(values);
  };

  return (
    <div>
      {/*******  picks **********/}
      {prizePick ? (
        <CommonModal
          width={700}
          isModalOpen={prizePick}
          setIsModalOpen={setPrizePick}
        >
          <PrizesPick
            setIsModalOpen={setPrizePick}
            selectHandler={prizePickHandler}
          />
        </CommonModal>
      ) : (
        ""
      )}

      {loading ? (
        <SpinStyle>
          <Spin style={{ color: "#fff" }} size="large" />
        </SpinStyle>
      ) : (
        ""
      )}
      {/* <button onClick={() => setPrizePick(true)}>hhhhhh</button> */}

      <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {}}
        validateMessages={validateMessages}
      >
        <div className="flex gap-3">
          <Form.Item
            className=" flex-1"
            name={["prize", "value"]}
            label="value"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>

          <Form.Item
            name={["prize", "count"]}
            className=" flex-1"
            label="Amount of prize"
          >
            <InputNumber
              className="border-gray-400 w-full py-1"
              // style={{
              //   minWidth: 150,
              // }}
            />
          </Form.Item>
        </div>

        <div className="flex gap-3 ">
          <Form.Item
            className=" flex-1"
            name={["prize", "initialDate"]}
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker className="w-full" format={"YYYY/MM/DD"} />
          </Form.Item>

          <Form.Item
            name={["prize", "prizeDuration"]}
            className=" flex-1"
            label="Expri date Duration"
          >
            <Input
              className="border-gray-400 w-full py-1"
              // style={{
              //   minWidth: 150,
              // }}
            />
          </Form.Item>
        </div>
        <Form.Item name={["prize", "isBig"]} label="Is Big">
          <Switch
            checked={switch2}
            onChange={(value) => setSwitch2(value)}
            style={{ background: switch2 ? "blue" : "gray" }}
          />
        </Form.Item>
        <Form.Item
          className=" flex-1"
          name={["prize", "image"]}
          label="Image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload
            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>

        {/* <Form.Item
          name={["prize", "prize_type"]}
          label="Prize type"
          className=" flex-1 max-w-[400px] "
          rules={[
            {
              required: true,
              message: "Please select prize_type!",
            },
          ]}
        >
          <Select
            className="border-gray-400 "
            placeholder="select your prize_type"
          >
            <Option value="kind">kind</Option>
            <Option value="money">money</Option>
          </Select>
        </Form.Item> */}

        <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)}>cancel</button>
          <button type="submit">Submit</button>
        </ButtonStyle>
      </FormStyle>
    </div>
  );
};

const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  border-radius: 120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red;
  }
`;

export default PrizesEdit;
