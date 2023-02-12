import React from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

export type SearchState = {
	key: string;
	setKey: (state: string) => void;
};

export type SearchProps = {
	title: string;
	state: SearchState;
	icon: React.ReactNode;
	placeholder?: string;
	mapping_fn?: (obj: any) => string | Array<string>;
};

export function makeSearchState(
	mapping_fn: (obj: any) => string | string[] = () => "null",
	title: string = "Search",
	placeholder: string = "例如: 微博热搜",
	icon: React.ReactElement = <FiSearch className="w-10" />,
	default_search: string = ""
) {
	const [key, setKey] = React.useState<string>(default_search);

	const search = {
		title: title,
		icon: icon,
		state: { key: key, setKey: setKey },
		placeholder: placeholder,
		mapping_fn: mapping_fn,
	};
	return search;
}
export function SearchBar({ search }: { search: SearchProps }) {
	const keyRef = React.useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		search.state.setKey(keyRef.current!.value);
		router.push(
			{
				pathname: router.pathname,
				query: { keyword: keyRef.current!.value },
			},
			undefined,
			{
				shallow: true,
			}
		);
	};

	const handleFocus = (event: React.BaseSyntheticEvent) => {
		event.target.select();
		// event.target.value = "";
		// search.state.setKey("");
	};
	// console.log(search.state);
	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex border-gray-300 rounded-lg border-2 items-center justify-center p-1">
				<label
					htmlFor="text"
					className="block text-sm font-medium text-gray-700 mr-3"
				>
					搜索:
				</label>
				<input
					type="text"
					title={search.title}
					ref={keyRef}
					onFocus={handleFocus}
					placeholder={search.placeholder}
					className="w-full flex-1 rounded-none rounded-r-md sm:text-sm"
				/>
				<button type="submit" title="" className="">
					{search.icon}
				</button>
			</div>
		</form>
	);
}
