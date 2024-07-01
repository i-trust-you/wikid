import Link from "next/link";

interface Item {
	name: string;
	href: string;
}

interface ItemListProps {
	items: Item[];
	styles?: { boxShadow: string };
	classNames?: string;
}

const ExpandedMenu: React.FC<ItemListProps> = ({ items, styles, classNames }) => {
	return (
		<ul style={styles} className={`z-100 flex w-fit flex-col items-center rounded-[10px] bg-white text-md text-gray-500 ${classNames}`}>
			{items.map((item, index) => (
				<li className="cursor-pointer p-[10px_35px]" key={index}>
					<Link href={item.href}>{item.name}</Link>
				</li>
			))}
		</ul>
	);
};

export default ExpandedMenu;
