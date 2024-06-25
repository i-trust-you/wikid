export default function Footer() {
	return (
		<footer className="mb-[10px] bg-[#3B415B] p-[40px_20px] text-white tablet:p-[60px_48px] desktop:p-[80px]">
			<span className="text-[10px] font-bold tablet:text-lg">Copyright &copy; Wikied. All Rights Reserved</span>
			<p className="text-[8px] tablet:text-md">
				사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은 <br /> 서울특별시 중구 청계천로 123, 위키드빌딩
			</p>
			<ul className="mt-[20px] flex gap-[30px] text-[8px] tablet:mt-[30px] tablet:text-md">
				<li className="cursor-pointer">서비스 이용약관</li>
				<li className="cursor-pointer">개인정보 취급 방침</li>
				<li className="cursor-pointer">전자금융거래 기본약관</li>
			</ul>
		</footer>
	);
}
