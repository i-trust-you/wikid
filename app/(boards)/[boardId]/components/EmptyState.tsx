interface EmptyStateProps {
	text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
	return <p>{text}</p>;
};

export default EmptyState;
