interface EmptyStateProps {
	text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
	return (
		<div className="flex h-[128px] items-center justify-center rounded-[10px] font-normal text-gray-400 shadow-basic tablet:h-[134px] tablet:text-xl desktop:h-[136px]">
			{text}
		</div>
	);
};

export default EmptyState;
