


import { PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Button, Input, Typography, Form, Tabs, Card, Modal, Select, Alert, Badge, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import { useDispatch } from 'react-redux';

const FormItem = Form.Item;
import stockcolumns from '../utils/stockcolumns';
import categories from '../utils/categories';


const { Search } = Input;
const { TabPane } = Tabs;
const { Text } = Typography;

const BatchListing = (props) => {
  const { batches = [], stocks = [] } = props;
  const history = useHistory();
  const [visibleDeleteProduct, setVisibleDeleteProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [lastdata, setLastdata] = useState([]);
  const [productName, setProductName] = useState('');
  const [loadingProductDeletion, setLoadingProductDeletion] = useState(false);

  const actionRef = useRef();

  const addProduct = () => {
    history.push('/product/create');
  }

  const callback = (key) => {

  }

  const [form2] = Form.useForm();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }

  }

  const handleCancelvisibleDeleteProduct = async () => setVisibleDeleteProduct(false);

  const productcolumns = [
    {
      title: formatMessage({ id: 'batch.startdate' }),
      dataIndex: 'startdate',
      valueType: 'text',
      render: (text) => <Text strong>{text}</Text>,
    },

    {
      title: formatMessage({ id: 'batch.exitdate' }),
      dataIndex: 'exitdate',
      valueType: 'text',
      render: (text) => <Text strong>{text}</Text>,
    },

    {
      title: formatMessage({ id: 'batch.nrofchicks' }),
      dataIndex: 'nrofchicks',
      valueType: 'text',
      render: (text) => <Text strong>{text}</Text>,
    },

    {
      title: formatMessage({ id: 'batch.deadchicks' }),
      dataIndex: 'deadchicks',
      valueType: 'text',
      render: (text) => <Text strong>{text}</Text>,
    },

    {
      title: formatMessage({ id: 'operations' }),
      dataIndex: 'option',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>

          <a onClick={() => {


            history.push('/product/edit');

          }}>
            {<EditTwoTone style={{ fontSize: '20px', color: '#1890ff' }} />}

          </a>

          <a style={{ 'margin-left': '20px' }} onClick={() => {
            setVisibleDeleteProduct(true);
            setProduct(record);
          }}>
            {<DeleteTwoTone twoToneColor="#FC550B" style={{ fontSize: '20px' }} />}

          </a>
        </>
      ),
    },
  ];

  const confirmvisibleDeleteProduct = () => {
    setLoadingProductDeletion(true);

    setVisibleDeleteProduct(false);
    setLoadingProductDeletion(false);

  }

  useEffect(() => {

  }, []);

  return (
    <Card title={<span>
      <div style={{ 'margin-left': '0px' }}>


      <Select placeholder={formatMessage({ id: 'search.bycategory' })}

onChange={(categoryid) => {
  let s = products.filter(d => d.categoryid == categoryid);
  setLastdata(s);
}}
style={{ width: '60%' }}>
{
  categories.length != 0 ? categories.map((u) =>
    <Option value={u.id}>{u.name}</Option>
  ) : null

}

</Select>



        <Select placeholder={formatMessage({ id: 'search.bycategory' })}

          onChange={(categoryid) => {
            let s = products.filter(d => d.categoryid == categoryid);
            setLastdata(s);
          }}

          style={{ 'margin-left': '10px' }}>
          {
            categories.length != 0 ? categories.map((u) =>
              <Option value={u.id}>{u.name}</Option>
            ) : null

          }

        </Select></div>
    </span>}

      extra={<span>
        <>
          <Button size='middle' type='primary' icon={<PlusOutlined />} onClick={addProduct}>  {formatMessage({ id: 'product.add' })}</Button>
          <Button size='middle' onClick={() => { history.push('/report') }} style={{ 'margin-left': '10px' }}> <PrinterOutlined /> {formatMessage({ id: 'product.print' })}</Button>


        </>
      </span>} bordered={false}  >

          <Table
            size='middle'
            actionRef={actionRef}
            rowKey="id"
            search={false}

            dataSource={lastdata.length == 0 ? batches : lastdata}
            columns={productcolumns}
            rowSelection={{}}
          />


          <Modal
            visible={visibleDeleteProduct}
            title={<Alert message={formatMessage({ id: 'delete.product.question' })} description={formatMessage({ id: 'delete.product.warning' })} type="error" showIcon />}
            footer={[
              <Button key="back" onClick={handleCancelvisibleDeleteProduct}>
                {formatMessage({ id: 'global.cancel' })}
              </Button>,
              <Button key="submit" type="danger" disabled={!product.name || productName.toLowerCase() != product.name.toLowerCase()} loading={loadingProductDeletion} onClick={confirmvisibleDeleteProduct}>
                {formatMessage({ id: 'product.remove' })}
              </Button>,
            ]}
            closable={false}
            onCancel={handleCancelvisibleDeleteProduct}
          >
            <Form {...layout} form={form2}>
              <Text type="secondary" > {formatMessage({ id: 'confirm.product.delection' })}</Text>
              <FormItem

                label={formatMessage({ id: 'product.name' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'error.product.name.required' }),
                  },

                ]}
              >
                <Input
                  name="name"
                  autoComplete='off'
                  onChange={(ev) => {

                    setProductName(ev.target.value);
                  }}
                  placeholder={product.name}
                />
              </FormItem></Form>
          </Modal>
</Card>
  );
};

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/update'],
}))(BatchListing);
