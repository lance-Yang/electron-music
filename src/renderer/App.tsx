/* eslint-disable no-useless-computed-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Input, Row, Col, Avatar, Divider, Space } from 'antd';
import { useRequest } from 'ahooks';
import cls from 'classnames';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import  './App.css';

import instance from 'api/instance';
import {TOP_LIST,PLAYLIST_DETAIL} from 'api/api'
import HomePage from './home';
import PlayFooter from './footer';

const MAX_BAR_HEIGHT = 18;

const LoginPage = () => {


  const [selectId,setSelectId] = useState("");

	const handleMiniApp = () => {
		window.electron.ipcRenderer.sendMessage('min-app', []);
	};

	const handleCloseApp = () => {
		window.electron.ipcRenderer.sendMessage('close-app', []);
	};
 // 获取左侧菜单
  const {data}:any = useRequest(() =>instance.get(TOP_LIST));

  // 获取歌单列表
  const {data:song,run:fetchSongList}:any = useRequest((id) => instance.get(PLAYLIST_DETAIL,{id}),{
    manual:true
  })

  console.log(song,'songList')

  const  addBarSpans = () => {
    const bars = document.getElementsByClassName('equalizer-bar');
    let html = '';
    for (let j = 0; j < MAX_BAR_HEIGHT; j++) {
      html += '<span></span>';
    }
    for (let i = 0; i < bars.length; i++) {
      bars[i].innerHTML = html;
    }
  }

  const getRandomHeight = (maxBarHeight:number) =>{
    return Math.round(Math.random() * (maxBarHeight - 1)) + 1;
  }

  const getActiveSpans = (spans:any) => {
    let counter = 0;
  
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].style.opacity > 0) counter++;
    }
  
    return counter;
  }

  const setRandomBars = (maxBarHeight?:number) => {
    const bars = document.getElementsByClassName('equalizer-bar');
    for (let i = 0; i < bars.length; i++) {
      const spans = bars[i].getElementsByTagName('span');
      const activeSpanCount = getActiveSpans(spans);
      const newHeight = getRandomHeight(MAX_BAR_HEIGHT);
      for (let j = 0; j < spans.length; j++) {
        if (newHeight > activeSpanCount) {
          spans[j].style.opacity = '1';
        } else if (j > newHeight) {
          spans[j].style.opacity = '0';
        }
        // set little opacity
        const upperSpan = MAX_BAR_HEIGHT - j;
        if (newHeight > MAX_BAR_HEIGHT - 5 && upperSpan < 5) {
          spans[j].style.opacity = `0.${upperSpan}`;
        }
      }
    }
  }

  const handleSelect = (id:string) => {
    setSelectId(id)
    fetchSongList(id)
  }
  

  useEffect(() => {
    addBarSpans()
    setInterval(() => {
      setRandomBars();
    }, 200);
  }, [])
 

	return (
		<div className="container">
			<div className="header">
				<MinusOutlined className="narrow" onClick={handleMiniApp} />
				<CloseOutlined className="closeIcon" onClick={handleCloseApp} />
			</div>
			<div className="content">
				<Row>
					<Col span={8} />
					<Col span={8}>
						<Input placeholder="搜索音乐" />
					</Col>
					<Col span={8} />
				</Row>
        <Row gutter={3} className='menu'>
          <Col span={4} className='innerbox leftMenu'> 
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div className={cls("menuItem",{
            ["menuItemActive"]: selectId === ""
          })} onClick={() => handleSelect("")}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{marginRight:7}} />
              我的收藏
          </div>
          {
            data?.list.map((item:any) => (
              <div className={cls("menuItem",{
                ["menuItemActive"]: selectId === item.id
              })}  key={item?.id} onClick={() => handleSelect(item.id)}>
                <Avatar src={item?.coverImgUrl} style={{marginRight:7}} />
                {item?.name}
              </div>
            ))
          }
          </Col> 
          <Col span={16} style={{height:'100%'}}>
            <div style={{height:'50%' , overflow:'hidden' , marginTop:10,padding:"0 10px"}}>
               {
                 song?.playlist?.tracks.map((track:any,index:number) => (
                   <div className="songItem">
                     <div>
                      <Space>
                        <span>{index + 1}</span>
                        <span>{track.name}</span>
                      </Space>
                     </div>
                     <div>xx</div>
                   </div>
                 ))
               }
            </div> 
            <Divider />
            <div style={{height:'50%'}}>
                <div className="equalizer">
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar">
                  <span />
                </div>
                <div className="equalizer-bar"> 
                  <span />
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar"> 
                  <span />
                </div>
                <div className="equalizer-bar"> 
                  <span />
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar"> 
                  <span />
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar"> 
                  <span />
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
                <div className="equalizer-bar">
                  <span />
                </div>
                <div className="equalizer-bar">
                  <span /> 
                </div>
              </div>
            </div> 
          </Col> 
          <Col span={4} className="rightMenu"> aa </Col> 
        </Row>
			</div>
      <div className="footer">
          <PlayFooter />
      </div>
		</div>
	);
};

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</Router>
	);
}
