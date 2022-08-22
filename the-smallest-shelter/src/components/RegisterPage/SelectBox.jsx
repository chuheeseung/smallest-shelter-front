import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Typography } from 'antd';
import { useState } from 'react';
const { Option } = Select;
let index = 0;

function SelectBox() {
    const [items, setItems] = useState(["홍염", "파보", "코로나", "슬개골",]);
    const [name, setName] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = items.filter((o) => !selectedItems.includes(o));

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
    };

    return (
        <Select
            mode="multiple"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
                textAlign: "center",
                width: '180px',
            }}
            placeholder="질병을 선택하세요"
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider
                        style={{
                            margin: '8px 0',
                        }}
                    />
                    <Space
                        align="center"
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Input placeholder="직접 입력" value={name} onChange={onNameChange} />
                        <Typography.Link
                            onClick={addItem}
                            style={{
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <PlusOutlined /> Add item
                        </Typography.Link>
                    </Space>
                </>
            )}
        >
            {items.map((item) => (
                <Option key={item}>{item}</Option>
            ))}
        </Select>
    );
};

export default SelectBox;