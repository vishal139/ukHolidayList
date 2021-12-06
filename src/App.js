import './App.css';
import 'antd/dist/antd.css';

import React,{ useState} from 'react'
import { Button, DatePicker, Space, Card, Col, Row } from 'antd'
import Holiday from './Component/Holiday';
const {RangePicker} = DatePicker;

const App = () => {
  const [selectedDate, setselectedDate] = useState(null)
  const [flag1, setflag1] = useState(false)
  const [flag2, setflag2] = useState(false)
  const [dateRange, setdateRange] = useState({
      low:null,
      high:null,
  })

  const handleChange = (date, dateString)=>{
      setflag1(false);
      setselectedDate(date);
  }

  const handleRangeChange = (date, dateString)=>{
   
    setflag2(false);
    if(date==null)
    {
      setdateRange({
        low:null,
        high:null,
      });
    }
    else
    {
      setdateRange({
        ...dateRange,
        ...(date[0] && {low:date[0].format('YYYY-MM-DD')}),
        ...(date[1] && {high:date[1].format('YYYY-MM-DD')}),

      })
    }
     
  }

  const handleDateClick = ()=>{
    setflag1(true);
    setflag2(false);
  }

  const handleRangeDateClick =(e)=>{
    setflag2(true);
    setflag1(false);
  }

  return (
    <div className = 'App'>
        <h1>Bank Holiday</h1>
        <h2>Check Holiday for a Date or in a Date range</h2>
        <Space size={'large'}>
          <Space size={'small'}>
              <DatePicker 
                onChange={handleChange}
              />
              <Button type='primary' onClick={handleDateClick} disabled={!selectedDate?true:false}>Get Data</Button>
          </Space>

          <Space>
              <RangePicker
                onChange={handleRangeChange}
              />
              <Button type='primary' onClick={handleRangeDateClick} disabled={(!dateRange.low||!dateRange.high)?true:false}>Get Data</Button>
          </Space>
        </Space>
        <div style={{ marginTop: 16 }}>
            {flag1&&selectedDate?<h2>Holiday on {selectedDate.format('YYYY-MM-DD')}</h2>:null}
            {flag2&&dateRange?<h2>Holiday between {dateRange.low} and {dateRange.high}</h2>:null}
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="England and Wales" bordered={false}>
                      {selectedDate&&flag1?<Holiday find = {selectedDate.format('YYYY-MM-DD')} country={'england-and-wales'}/>:null}
                      {dateRange.low&&dateRange.high&&flag2?<Holiday low={dateRange.low} high={dateRange.high} country={'england-and-wales'}/>:null}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="scotland" bordered={false}>
                      {selectedDate&&flag1?<Holiday find = {selectedDate.format('YYYY-MM-DD')} country={'scotland'}/>:null}
                      {dateRange.low&&dateRange.high&&flag2?<Holiday low={dateRange.low} high={dateRange.high} country={'scotland'}/>:null}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Northern Ireland" bordered={false}>
                      {selectedDate&&flag1?<Holiday find = {selectedDate.format('YYYY-MM-DD')} country={'northern-ireland'}/>:null}
                      {dateRange.low&&dateRange.high&&flag2?<Holiday low={dateRange.low} high={dateRange.high} country={'northern-ireland'}/>:null}
                  </Card>
                </Col>
              </Row>
          </div>
        </div>
    </div>
  )
}

export default App

