"use client";

import { useState } from "react";

import Header from "@/_components/common/Header";

export default function Page() {
	const [isLogin, setIsLogin] = useState(false);
	const [alarm, setAlarm] = useState(0);
	const handleLogin = () => {
		setIsLogin((prevState) => !prevState);
	};
	const Alarming = () => {
		setAlarm((alarmCount) => alarmCount + 1);
	};

	const buttonStyle = "bg-gray-300 p-[15px_20px] m-[10px] rounded-[5px]";

	return (
		<>
			<Header alarm={alarm} loggedIn={isLogin} />
			<button className={buttonStyle} onClick={handleLogin}>
				로그인 / 로그아웃
			</button>
			<button className={buttonStyle} onClick={Alarming}>
				알림 +
			</button>
		</>
	);
}
