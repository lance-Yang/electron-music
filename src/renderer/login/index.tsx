/* eslint-disable prettier/prettier */
import { useState } from 'react';
// import { Space } from 'antd';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import cls from 'classnames';
import './index.css';

const LoginPage = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  //   const navigate = useNavigate();
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleLogin = () => {
    // navigate('/home');
    window.electron.ipcRenderer.sendMessage('load-page', []);
  };

  const handleMiniApp = () => {
    window.electron.ipcRenderer.sendMessage('min-app', []);
    setIsFocus(false);
  };

  const handleCloseApp = () => {
    window.electron.ipcRenderer.sendMessage('close-app', []);
    setIsFocus(false);
  };

  return (
    <div className="container">
      <div className="header">
        {/* <Space> */}
        <MinusOutlined className="narrow" onClick={handleMiniApp} />
        <CloseOutlined className="closeIcon" onClick={handleCloseApp} />
        {/* </Space> */}
      </div>
      <div className="login-box">
        <div
          className={cls('owl', {
            // eslint-disable-next-line no-useless-computed-key
            ['password']: isFocus,
          })}
          id="owl"
        >
          <div className="hand" />
          <div className="hand hand-r" />
          <div className="arms">
            <div className="arm" />
            <div className="arm arm-r" />
          </div>
        </div>
        <div className="input-box">
          <input type="text" placeholder="账号" />
          <input
            type="password"
            placeholder="密码"
            id="password"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="button" onClick={handleLogin}>
            登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
