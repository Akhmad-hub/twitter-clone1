export const formatPostDate = (createdAt) => {
	const currentDate = new Date();
	const createdAtDate = new Date(createdAt);

	const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
	const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
	const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
	const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

	if (timeDifferenceInDays > 1) {
		return createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	} else if (timeDifferenceInDays === 1) {
		return "1d";
	} else if (timeDifferenceInHours >= 1) {
		return `${timeDifferenceInHours}h`;
	} else if (timeDifferenceInMinutes >= 1) {
		return `${timeDifferenceInMinutes}m`;
	} else {
		return "Just now";
	}
};

export const formatMemberSinceDate = (createdAt) => {
	const date = new Date(createdAt);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `Joined ${month} ${year}`;
};



// 1d 1h 1m 1s

export const formatPostDate1 = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    const timeDifferenceInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
    const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);

    const years = timeDifferenceInYears > 0 ? `${timeDifferenceInYears}y ` : '';
    const months = (timeDifferenceInMonths % 12) > 0 ? `${timeDifferenceInMonths % 12}mo ` : '';
    const days = (timeDifferenceInDays % 30) > 0 ? `${timeDifferenceInDays % 30}d ` : '';
    const hours = (timeDifferenceInHours % 24) > 0 ? `${timeDifferenceInHours % 24}h ` : '';
    const minutes = (timeDifferenceInMinutes % 60) > 0 ? `${timeDifferenceInMinutes % 60}m ` : '';
    const seconds = (timeDifferenceInSeconds % 60) > 0 ? `${timeDifferenceInSeconds % 60}s ` : '';

	
	
	const formattedTime= `${seconds}${minutes}${hours}${days}${months}${years}`.trim();

    return formattedTime || "Just now";
};


