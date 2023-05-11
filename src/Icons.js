// src/Icons.js

export const DeleteIcon = () => (
	<svg className="delete-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
		<title>Delete Card</title>
		<circle cx="7" cy="7" r="7" fill="#ff0000" />
		<line x1="4" y1="4" x2="10" y2="10" stroke="white" stroke-width="2" />
		<line x1="10" y1="4" x2="4" y2="10" stroke="white" stroke-width="2" />
	</svg>
);

export const DeleteGroupIcon = () => (
	<svg className="delete-group-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" title="Delete Group">
		<title>Delete Group</title>
		<circle cx="10" cy="10" r="9" fill="#eeeeee" />
		<line x1="6" y1="6" x2="14" y2="14" stroke="#ffffff" stroke-width="2" />
		<line x1="14" y1="6" x2="6" y2="14" stroke="#ffffff" stroke-width="2" />
	</svg>
);

export const BackIcon = () => (
	<svg className="back-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
		<title>Remove From Group</title>
		<polygon points="9,1 4,7 9,13" fill="#005a82" />
	</svg>
);

// Add more SVG components as needed
