/** @see https://wikied-api.vercel.app/docs/#/ */
export default abstract class API
{
	private constructor()
	{
		// final
	}

	protected static query(data: object)
	{
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(data))
		{
			switch (value)
			{
				case NaN: case null: case undefined:
				{
					break;
				}
				default:
				{
					params.set(key, value);
					break;
				}
			}
		}
		return params.toString();
	}

	protected static GET<T>(headers: HeadersInit = {}, url: string)
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "GET", headers });
			
			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static PUT<T>(headers: HeadersInit = {}, url: string, body: BodyInit)
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "PUT", headers: { "accept": "application/json", ...headers }, body: body });
			
			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static POST<T>(headers: HeadersInit = {}, url: string, body: BodyInit)
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "POST", headers: { "accept": "application/json", ...headers }, body: body });
			
			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static PATCH<T>(headers: HeadersInit = {}, url: string, body: BodyInit)
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "PATCH", headers: { "accept": "application/json", ...headers }, body: body });
			
			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected static DELETE<T>(headers: HeadersInit = {}, url: string)
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "DELETE", headers: { "accept": "application/json", ...headers } });
			
			const data = await response.json();

			return response.ok ? resolve(data) : reject(data);
		});
	}

	protected GET(headers: HeadersInit, query: unknown)
	{
		throw new Error("Unimplemented");
	}

	protected PUT(headers: HeadersInit, query: unknown, body: unknown)
	{
		throw new Error("Unimplemented");
	}

	protected POST(headers: HeadersInit, query: unknown, body: unknown)
	{
		throw new Error("Unimplemented");
	}

	protected PATCH(headers: HeadersInit, query: unknown, body: unknown)
	{
		throw new Error("Unimplemented");
	}

	protected DELETE(headers: HeadersInit, query: unknown)
	{
		throw new Error("Unimplemented");
	}

	public static readonly ["{teamId}/users/me"] = new class extends API
	{
		public override GET(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; })
		{
			return API.GET<User>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/users/me`);
		}
	}

	public static readonly ["{teamId}/users/me/password"] = new class extends API
	{
		public override PATCH(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; }, body: UpdatePasswordBody)
		{
			return API.PATCH<User>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/users/me/password`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/profiles"] = new class extends API
	{
		public override POST(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; }, body: CreateProfileBody)
		{
			return API.POST<ProfileListType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/profiles?${API.query(query)}`, JSON.stringify(body));
		}

		public override GET(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; name: string; page: number; pageSize: number; })
		{
			return API.GET<OffsetBasedPaginationResponse<ProfileListType>>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/profiles`);
		}
	}

	public static readonly ["{teamId}/profiles/{code}"] = new class extends API
	{
		public override GET(headers: HeadersInit, { code, ...query }: { code: number; })
		{
			return API.GET<ProfileDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/profiles/${code}`);
		}

		public override PATCH(headers: HeadersInit, { teamId = "6-11", code, ...query }: { teamId: string; code: number; }, body: UpdateProfileBody)
		{
			return API.PATCH<ProfileDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/profiles/${code}`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/profiles/{code}/ping"] = new class extends API
	{
		public override GET(headers: HeadersInit, { code, ...query }: { code: number; })
		{
			return API.GET<PingResponse>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/profiles/${code}/ping`);
		}

		public override POST(headers: HeadersInit, { teamId = "6-11", code, ...query }: { teamId: string; code: number; }, body: PingRequestBody)
		{
			return API.POST<PingResponse>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/profiles/${code}/ping`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/notifications"] = new class extends API
	{
		public override GET(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; page: number; pageSize: number; })
		{
			return API.GET<PingResponse>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/notifications?${API.query(query)}`);
		}
	}

	public static readonly ["{teamId}/notifications/{id}"] = new class extends API
	{
		public override DELETE(headers: HeadersInit, { teamId = "6-11", id, ...query }: { teamId: string; id: number; })
		{
			return API.DELETE<NotificationType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/notifications/${id}`);
		}
	}

	public static readonly ["{teamId}/images/upload"] = new class extends API
	{
		public override POST(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; }, body: string)
		{
			return API.POST<{ url: String; }>({ "Content-Type": "multipart/form-data", ...headers }, `https://wikied-api.vercel.app/${teamId}/images/upload`, body);
		}
	}

	public static readonly ["{teamId}/articles/{articleId}/comments"] = new class extends API
	{
		public override POST(headers: HeadersInit, { articleId, ...query }: { articleId: number; }, body: CreateCommentBody)
		{
			return API.POST<CommentType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/articles/${articleId}/comments`, JSON.stringify(body));
		}

		public override GET(headers: HeadersInit, { articleId, ...query }: { articleId: number; limit: number; cursor?: number; })
		{
			return API.GET<CursorBasedPaginationResponse<CommentType>>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/articles/${articleId}/comments?${API.query(query)}`);
		}
	}

	public static readonly ["{teamId}/comments/{commentId}"] = new class extends API
	{
		public override PATCH(headers: HeadersInit, { commentId, ...query }: { commentId: number; }, body: UpdateCommentBody)
		{
			return API.PATCH<CommentType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/comments/${commentId}`, JSON.stringify(body));
		}

		public override DELETE(headers: HeadersInit, { commentId, ...query }: { commentId: number; })
		{
			return API.DELETE<{ id: number; }>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/comments/${commentId}`);
		}
	}

	public static readonly ["{teamId}/auth/signUp"] = new class extends API
	{
		public override POST(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; }, body: SignUpRequestBody)
		{
			return API.POST<SignUpResponse>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/auth/signUp`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/auth/signIn"] = new class extends API
	{
		public override POST(headers: HeadersInit, { ...query }: {}, body: SignInRequestBody)
		{
			return API.POST<SignInResponse>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/auth/signIn`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/auth/refresh-token"] = new class extends API
	{
		public override POST(headers: HeadersInit, { ...query }: {}, body: { refreshToken: string; })
		{
			return API.POST<{ accessToken: string; }>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/auth/refresh-token`, JSON.stringify(body));
		}
	}

	public static readonly ["{teamId}/articles"] = new class extends API
	{
		public override POST(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; }, body: CreateArticleBody)
		{
			return API.POST<ArticleListType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/articles`, JSON.stringify(body));
		}

		public override GET(headers: HeadersInit, { teamId = "6-11", ...query }: { teamId: string; page?: number; pageSize?: number; orderBy?: "like" | "recent"; keyword?: string; })
		{
			return API.GET<OffsetBasedPaginationResponse<ArticleListType>>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/articles?${API.query}`);
		}
	}

	public static readonly ["{teamId}/articles/{articleId}"] = new class extends API
	{
		public override GET(headers: HeadersInit, { teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number; })
		{
			return API.GET<ArticleDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/articles/${articleId}`);
		}

		public override PATCH(headers: HeadersInit, { teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number; }, body: UpdateArticleBody)
		{
			return API.PATCH<ArticleDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/articles/${articleId}`, JSON.stringify(body));
		}

		public override DELETE(headers: HeadersInit, { teamId = "6-11", articleId, ...query }: { teamId: string; articleId: number; })
		{
			return API.DELETE<{ id: number; }>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/${teamId}/articles/${articleId}`);
		}
	}

	public static readonly ["{teamId}/articles/{articleId}/like"] = new class extends API
	{
		public override POST(headers: HeadersInit, { articleId, ...query }: { articleId: number; })
		{
			return API.POST<ArticleDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/articles/${articleId}/like`, "");
		}

		public override DELETE(headers: HeadersInit, { articleId, ...query }: { articleId: number; })
		{
			return API.DELETE<ArticleDetailType>({ "Content-Type": "application/json", ...headers }, `https://wikied-api.vercel.app/{teamId}/articles/${articleId}/like`);
		}
	}
}

interface OffsetBasedPaginationResponse<T>
{
	list: T[];
	totalCount: number;
}

interface CursorBasedPaginationResponse<T>
{
	list: T[];
	nextCursor: number;
}

interface User
{
	id: number;
	name: string;
	teamId: string;
	profile:
	{
		id: number;
		code: string;
	};
	createdAt: string;
	updatedAt: string;
}

interface UpdatePasswordBody
{
	password: string;
	currentPassword: string;
	passwordConfirmation: string;
}

interface CreateProfileBody
{
	securityAnswer: string;
	securityQuestion: string;
}

interface UpdateProfileBody
{
	content: string;
	image: string;
	city: string;
	mbti: string;
	sns: string;
	family: string;
	birthday: string;
	nickname: string;
	bloodType: string;
	nationality: string;
	securityAnswer: string;
	securityQuestion: string;
}

interface ProfileDetailType
{
	id: number;
	name: string;
	code: string;
	teamId: string;
	job: string;
	sns: string;
	mbti: string;
	city: string;
	image: string;
	family: string;
	content: string;
	nickname: string;
	birthday: string;
	bloodType: string;
	nationality: string;
	securityQuestion: string;
}

interface ProfileListType
{
	id: number;
	job: string;
	name: string;
	code: string;
	city: string;
	image: string;
	updatedAt: string;
	nationality: string;
}

interface PingRequestBody
{
	securityAnswer: string;
}

interface PingResponse
{
	userId: number;
	registeredAt: string;
}

interface NotificationType
{
	id: number;
	content: string;
	createdAt: string;
}

interface CreateCommentBody
{
	content: string;
}

interface UpdateCommentBody
{
	content: string;
}

interface CommentType
{
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	writer:
	{
		id: number;
		name: string;
		image: string;
	};
}

interface SignUpRequestBody
{
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface SignUpResponse
{
	user:
	{
		id: number;
		name: string;
		email: string;
		teamId: string;
		profile:
		{
			id: number;
			code: string;
		};
		createdAt: string;
		updatedAt: string;
	};
}

interface SignInRequestBody
{
	email: string;
	password: string;
}

interface SignInResponse
{
	user:
	{
		id: number;
		name: string;
		email: string;
		teamId: string;
		profile:
		{
			id: number;
			code: string;
		};
		createdAt: string;
		updatedAt: string;
	};
}

interface CreateArticleBody
{
	title: string;
	image: string;
	content: string;
}

interface ArticleListType
{
	id: number;
	title: string;
	image: string;
	writer:
	{
		id: number;
		name: string;
	};
	likeCount: number;
	createdAt: string;
	updatedAt: string;
}

interface ArticleDetailType
{
	id: number;
	title: string;
	image: string;
	content: string;
	isLiked: boolean;
	writer:
	{
		id: number;
		name: string;
	};
	likeCount: number;
	createdAt: string;
	updatedAt: string;
}

interface UpdateArticleBody
{
	title: string;
	image: string;
	content: string;
}
