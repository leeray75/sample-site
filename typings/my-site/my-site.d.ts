// Type definitions for MySite

interface MySite {
	staticHost: string;
	appSrc: string;
	templatesSrc: string;
	stylesSrc: string;
	baseHref: string;
	onError:  () => void;
}

declare var MySite: MySite;

declare module "MySite" {
  export = MySite;
}

