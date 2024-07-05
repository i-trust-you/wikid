import BackLink from "@/_components/common/BackLink";

type WikiLinkProps = {
	code: string;
};

export default function WikiLink({ code }: WikiLinkProps) {
	const currentProtocol = window.location.protocol;
	const currentHostname = window.location.hostname;
	const currentPort = window.location.port;

	return <BackLink>{`${currentProtocol}//${currentHostname}${currentPort === "" ? "" : `:${currentPort}`}/wiki/${code}`}</BackLink>;
}
