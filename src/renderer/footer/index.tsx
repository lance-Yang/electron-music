/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row, Col, Space, Button } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined, PlayCircleOutlined } from '@ant-design/icons';

import './index.css';

const PlayFooter = () => {
	return (
		<Row className="play_container">
			<Col span={8}>
				<Space>
					<Button type="link" shape="circle" icon={<StepBackwardOutlined />} />
					<Button
						type="link"
						shape="circle"
						// icon={
						//   (isPlay && <PauseCircleOutlined style={{ fontSize: 30 }} />) || (
						//     <PlayCircleOutlined style={{ fontSize: 30 }} />
						//   )
						// }
						icon={<PlayCircleOutlined style={{ fontSize: 30 }} />}
					/>
					<Button type="link" shape="circle" icon={<StepForwardOutlined />} />
				</Space>
			</Col>
			<Col span={8}>
				<div className="audio">
					<span />
					<audio
						autoPlay
						// ref={audioRef}
						// onEnded={reloadPlay}
						// onCanPlay={getAudioTime}
						style={{ width: '100%' }}
					/>
				</div>
			</Col>
			<Col span={8} />
		</Row>
	);
};

export default PlayFooter;
