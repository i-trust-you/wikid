import API from "@/_api";
import "@/_api";

const fetchUser = async () => {
	const response = await API["{teamId}/users/me"].GET({ teamId: "6-11" });
	return response;
};

export default fetchUser;
