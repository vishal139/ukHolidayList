import React,{useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { List, Divider, Space } from 'antd';
import axios from 'axios'
import moment from 'moment';

const Holiday =(props) => {
    const {find, country, low, high} = props

    const [data, setdata] = useState([]);

    const loadMoreData = async()=>{
        if(find!==undefined)
        {
            const response = await axios.get('https://www.gov.uk/bank-holidays.json');
            setdata(response.data[country].events.filter(ele=>ele.date===find))
        }
        else if(low!==undefined&&high!==undefined)
        {
            const response = await axios.get('https://www.gov.uk/bank-holidays.json')
            setdata(response.data[country].events.filter(ele=>moment(ele.date).isBetween(low,high)))
        }

        console.log(data);
        
    }

    useEffect(() => {
        loadMoreData();
      }, []);      
    return (
        <>
            <div  id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
            }}>
                <InfiniteScroll
                     dataLength={data.length}
                     next={loadMoreData}
                     hasMore={data.length < 50}
                     endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                     scrollableTarget="scrollableDiv"
                >
               
               <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id} style={{marginLeft:'40px'}}>
                            <Space size={'large'}>
                            {item.date}
                            {item.title}
                            </Space>
                        </List.Item>
                    )}
                />
                </InfiniteScroll>

            </div>
        </>
    )
}

export default Holiday
