const BASE_URL = "https://wikied-api.vercel.app";

const enum MIME {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data",
}

/** @see https://wikied-api.vercel.app/docs/#/ */
export default abstract class API {
	private static JWT: string;

	private constructor() {
		// final
	}

	public static credential(token: string) {
		API.JWT = `Bearer ${token}`;
	}

	protected static query(data: object) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(data)) {
			if (![NaN, null, undefined].includes(value)) {
				params.set(key, value);
			}
		}
		return params.toString();
	}

	protected static GET<T>(type: MIME, url: string) {
		return new Promise<T>(async (resolve, reject) => {
			const response = await fetch(url, { method: "GET", headers: { Authorization: API.JWT, "Content-Type": type, accept: MIME.JSON } });

			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static PUT<T>(type: MIME, url: string, body: BodyInit | Object) {
		const payload = typeof body === "object" ? JSON.stringify(body) : body;

		return new Promise<T>(async (resolve, reject) => {
			const response = await fetch(url, { method: "PUT", headers: { Authorization: API.JWT, "Content-Type": type, accept: MIME.JSON }, body: payload });

			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static POST<T>(type: MIME, url: string, body: BodyInit | Object) {
		const payload = typeof body === "object" ? JSON.stringify(body) : body;

		return new Promise<T>(async (resolve, reject) => {
			const response = await fetch(url, { method: "POST", headers: { Authorization: API.JWT, "Content-Type": type, accept: MIME.JSON }, body: payload });

			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static PATCH<T>(type: MIME, url: string, body: BodyInit | Object) {
		const payload = typeof body === "object" ? JSON.stringify(body) : body;

		return new Promise<T>(async (resolve, reject) => {
			const response = await fetch(url, { method: "PATCH", headers: { Authorization: API.JWT, "Content-Type": type, accept: MIME.JSON }, body: payload });

			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static DELETE<T>(type: MIME, url: string) {
		return new Promise<T>(async (resolve, reject) => {
			const response = await fetch(url, { method: "DELETE", headers: { Authorization: API.JWT, "Content-Type": type, accept: MIME.JSON } });

			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected GET(query: unknown) {
		throw new Error("Unimplemented");
	}

	protected PUT(query: unknown, body: unknown) {
		throw new Error("Unimplemented");
	}

	protected POST(query: unknown, body: unknown) {
		throw new Error("Unimplemented");
	}

	protected PATCH(query: unknown, body: unknown) {
		throw new Error("Unimplemented");
	}

	protected DELETE(query: unknown) {
		throw new Error("Unimplemented");
	}

	public static readonly ["{teamId}/users/me"] = new (class extends API {
		public override GET({ teamId = "6-11", ...query }: { teamId: string }) {
			return API.GET<User>(MIME.JSON, `${BASE_URL}/${teamId}/users/me`);
		}
	})();

	public static readonly ["{teamId}/users/me/password"] = new (class extends API {
		public override PATCH({ teamId = "6-11", ...query }: { teamId: string }, body: UpdatePasswordBody) {
			return API.PATCH<User>(MIME.JSON, `${BASE_URL}/${teamId}/users/me/password`, body);
		}
	})();

	public static readonly ["{teamId}/profiles"] = new (class extends API {
		public override POST({ teamId = "6-11", ...query }: { teamId: string }, body: CreateProfileBody) {
			return API.POST<ProfileDetailType>(MIME.JSON, `${BASE_URL}/${teamId}/profiles`, body);
		}

		public override GET({ teamId = "6-11", ...query }: { teamId: string; name: string; page: number; pageSize: number }) {
			return API.GET<OffsetBasedPaginationResponse<ProfileListType>>(MIME.JSON, `${BASE_URL}/${teamId}/profiles?${API.query(query)}`);
		}
	})();

	public static readonly ["{teamId}/profiles/{code}"] = new (class extends API {
		public override GET({ code, ...query }: { code: number }) {
			return API.GET<ProfileDetailType>(MIME.JSON, `${BASE_URL}/{teamId}/profiles/${code}`);
		}

		public override PATCH({ teamId = "6-11", code, ...query }: { teamId: string; code: number }, body: UpdateProfileBody) {
			return API.PATCH<ProfileDetailType>(MIME.JSON, `${BASE_URL}/${teamId}/profiles/${code}`, body);
		}
	})();

	public static readonly ["{teamId}/profiles/{code}/ping"] = new (class extends API {
		public override GET({ code, ...query }: { code: number }) {
			return API.GET<PingResponse>(MIME.JSON, `${BASE_URL}/{teamId}/profiles/${code}/ping`);
		}

		public override POST({ teamId = "6-11", code, ...query }: { teamId: string; code: number }, body: PingRequestBody) {
			return API.POST<PingResponse>(MIME.JSON, `${BASE_URL}/${teamId}/profiles/${code}/ping`, body);
		}
	})();

	public static readonly ["{teamId}/notifications"] = new (class extends API {
		public override GET({ teamId = "6-11", ...query }: { teamId: string; page: number; pageSize: number }) {
			return API.GET<OffsetBasedPaginationResponse<NotificationType>>(MIME.JSON, `${BASE_URL}/${teamId}/notifications?${API.query(query)}`);
		}
	})();

	public static readonly ["{teamId}/notifications/{id}"] = new (class extends API {
		public override DELETE({ teamId = "6-11", id, ...query }: { teamId: string; id: number }) {
			return API.DELETE<NotificationType>(MIME.JSON, `${BASE_URL}/${teamId}/notifications/${id}`);
		}
	})();

	public static readonly ["{teamId}/images/upload"] = new (class extends API {
		public override POST({ teamId = "6-11", ...query }: { teamId: string }, body: string) {
			return API.POST<{ url: string }>(MIME.FORM_DATA, `${BASE_URL}/${teamId}/images/upload`, body);
		}
	})();

	public static readonly ["{teamId}/articles/{articleId}/comments"] = new (class extends API {
		public override POST({ articleId, ...query }: { articleId: number }, body: CreateCommentBody) {
			return API.POST<CommentType>(MIME.JSON, `${BASE_URL}/{teamId}/articles/${articleId}/comments`, body);
		}

		public override GET({ articleId, ...query }: { articleId: number; limit: number; cursor?: number }) {
			return API.GET<CursorBasedPaginationResponse<CommentType>>(MIME.JSON, `${BASE_URL}/{teamId}/articles/${articleId}/comments?${API.query(query)}`);
		}
	})();

	public static readonly ["{teamId}/comments/{commentId}"] = new (class extends API {
		public override PATCH({ commentId, ...query }: { commentId: number }, body: UpdateCommentBody) {
			return API.PATCH<CommentType>(MIME.JSON, `${BASE_URL}/{teamId}/comments/${commentId}`, body);
		}

		public override DELETE({ commentId, ...query }: { commentId: number }) {
			return API.DELETE<{ id: number }>(MIME.JSON, `${BASE_URL}/{teamId}/comments/${commentId}`);
		}
	})();

	public static readonly ["{teamId}/auth/signUp"] = new (class extends API {
		public override POST({ teamId = "6-11", ...query }: { teamId: string }, body: SignUpRequestBody) {
			return API.POST<SignUpResponse>(MIME.JSON, `${BASE_URL}/${teamId}/auth/signUp`, body);
		}
	})();

	public static readonly ["{teamId}/auth/signIn"] = new (class extends API {
		public override POST({ ...query }: {}, body: SignInRequestBody) {
			return API.POST<SignInResponse>(MIME.JSON, `${BASE_URL}/{teamId}/auth/signIn`, body);
		}
	})();

	public static readonly ["{teamId}/auth/refresh-token"] = new (class extends API {
		public override POST({ ...query }: {}, body: { refreshToken: string }) {
			return API.POST<{ accessToken: string }>(MIME.JSON, `${BASE_URL}/{teamId}/auth/refresh-token`, body);
		}
	})();

	public static readonly ["{teamId}/articles"] = new (class extends API {
		public override POST({ teamId = "6-11", ...query }: { teamId: string }, body: CreateArticleBody) {
			return API.POST<ArticleListType>(MIME.JSON, `${BASE_URL}/${teamId}/articles`, body);
		}

		public override GET({ teamId = "6-11", ...query }: { teamId: string; page?: number; pageSize?: number; orderBy?: "like" | "recent"; keyword?: string }) {
			return API.GET<OffsetBasedPaginationResponse<ArticleListType>>(MIME.JSON, `${BASE_URL}/${teamId}/articles?${API.query}`);
		}
	})();

	public static readonly ["{teamId}/articles/{articleId}"] = new (class extends API {
		public override GET({ teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number }) {
			return API.GET<ArticleDetailType>(MIME.JSON, `${BASE_URL}/${teamId}/articles/${articleId}`);
		}

		public override PATCH({ teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number }, body: UpdateArticleBody) {
			return API.PATCH<ArticleDetailType>(MIME.JSON, `${BASE_URL}/${teamId}/articles/${articleId}`, body);
		}

		public override DELETE({ teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number }) {
			return API.DELETE<{ id: number }>(MIME.JSON, `${BASE_URL}/${teamId}/articles/${articleId}`);
		}
	})();

	public static readonly ["{teamId}/articles/{articleId}/like"] = new (class extends API {
		public override POST({ articleId, ...query }: { articleId: number }) {
			return API.POST<ArticleDetailType>(MIME.JSON, `${BASE_URL}/{teamId}/articles/${articleId}/like`, "");
		}

		public override DELETE({ articleId, ...query }: { articleId: number }) {
			return API.DELETE<ArticleDetailType>(MIME.JSON, `${BASE_URL}/{teamId}/articles/${articleId}/like`);
		}
	})();
}

interface OffsetBasedPaginationResponse<T> {
	list: T[];
	totalCount: number;
}

interface CursorBasedPaginationResponse<T> {
	list: T[];
	nextCursor: number;
}

interface User {
	createdAt: string;
	id: number;
	name: string;
	profile: {
		id: number;
		code: string;
	};
	teamId: string;
	updatedAt: string;
}

interface UpdatePasswordBody {
	currentPassword: string;
	password: string;
	passwordConfirmation: string;
}

interface CreateProfileBody {
	securityAnswer: string;
	securityQuestion: string;
}

interface UpdateProfileBody {
	birthday: string;
	bloodType: string;
	city: string;
	content: string;
	family: string;
	image: string;
	mbti: string;
	nationality: string;
	nickname: string;
	securityAnswer: string;
	securityQuestion: string;
	sns: string;
}

interface ProfileDetailType {
	birthday: string;
	bloodType: string;
	city: string;
	code: string;
	content: string;
	family: string;
	id: number;
	image: string;
	job: string;
	mbti: string;
	name: string;
	nationality: string;
	nickname: string;
	securityQuestion: string;
	sns: string;
	teamId: string;
	updatedAt: string;
}

interface ProfileListType {
	city: string;
	code: string;
	id: number;
	image: string;
	job: string;
	name: string;
	nationality: string;
	updatedAt: string;
}

interface PingRequestBody {
	securityAnswer: string;
}

interface PingResponse {
	registeredAt: string;
	userId: number;
}

interface NotificationType {
	content: string;
	createdAt: string;
	id: number;
}

interface CreateCommentBody {
	content: string;
}

interface UpdateCommentBody {
	content: string;
}

interface CommentType {
	content: string;
	createdAt: string;
	id: number;
	updatedAt: string;
	writer: {
		id: number;
		name: string;
		image: string;
	};
}

interface SignUpRequestBody {
	email: string;
	name: string;
	password: string;
	passwordConfirmation: string;
}

interface SignUpResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		id: number;
		name: string;
		email: string;
		teamId: string;
		profile: {
			id: number;
			code: string;
		};
		createdAt: string;
		updatedAt: string;
	};
}

interface SignInRequestBody {
	email: string;
	password: string;
}

interface SignInResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		id: number;
		name: string;
		email: string;
		teamId: string;
		profile: {
			id: number;
			code: string;
		};
		createdAt: string;
		updatedAt: string;
	};
}

interface CreateArticleBody {
	content: string;
	image: string;
	title: string;
}

interface ArticleListType {
	createdAt: string;
	id: number;
	image: string;
	likeCount: number;
	title: string;
	updatedAt: string;
	writer: {
		id: number;
		name: string;
	};
}

interface ArticleDetailType {
	content: string;
	createdAt: string;
	id: number;
	image: string;
	isLiked: boolean;
	likeCount: number;
	title: string;
	updatedAt: string;
	writer: {
		id: number;
		name: string;
	};
}

interface UpdateArticleBody {
	content: string;
	image: string;
	title: string;
}
