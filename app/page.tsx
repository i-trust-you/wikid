"use client";

import { useState } from "react";

import Header from "@/_components/common/Header/Header";

export default function Page() {
	const [isLogin, setIsLogin] = useState(false);
	const handleLogin = () => {
		setIsLogin((prevState) => !prevState);
	};

	return (
		<>
			<Header loggedIn={isLogin} />
			<button onClick={handleLogin}>로그인 / 로그아웃</button>
		</>
	);
}
