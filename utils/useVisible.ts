import React from "react";

export type Visible = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dropref: React.MutableRefObject<any>;
	menuref: React.MutableRefObject<any>;
};

export function useVisible(initialIsVisible: boolean): Visible {
	const [isComponentVisible, setIsComponentVisible] =
		React.useState<boolean>(initialIsVisible);
	const dropref = React.useRef<Node>(null);
	const menuref = React.useRef<Node>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (dropref.current && !dropref.current.contains(event.target as Node)) {
			setIsComponentVisible(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	const packed: Visible = {
		open: isComponentVisible,
		setOpen: setIsComponentVisible,
		dropref: dropref,
		menuref: menuref
	};
	return packed;
}