export type LinkT = {
    title: string,
    link: string,
    subLinks: {
        title: string | null,
        link: string | null,
        linkDescription?: string | null,
    }[],
    secondTitle?: string,
    secondLink?: string,
}

export default function getSubLinks(params: {
    title: string,
    link: string,
    navBarData: {
        title: string | null,
        link: string | null
    }[] | undefined,
    linksData: {
        title: string | null;
        link: string | null;
        linkTitle: string | null;
        linkDescription: string | null;
    }[] | undefined
}): LinkT  {
    if (params.navBarData) {
        return {
            title: params.title,
            link: params.link,
            subLinks: params.navBarData
        }
    } else {

        const linksData = params.linksData && params.linksData.length > 0
            ? params.linksData.map(item => {
                
                return ({
                    title: item.linkTitle, 
                    link: item.link ? `${params.link}#${item.link}` : null,
                    linkDescription: item.linkDescription
                })
            })
            : []

        const subLinks = linksData.filter((item) => (item.title !== null) && (item.link !== null));

        return {
            title: params.title,
            link: params.link,
            subLinks
        }
    }
}

export function getLinkTitle(
    params: { 
        title: string;
        navBarConfig: {
            navBarTitle: string | null;
            navBarDescription: string | null;
            navBarImage: {
                data: {
                    attributes: {
                        url: string;
                    };
                } | null;
            };
        } | null;
    } | undefined,
    dictTitle: string,
): string  {

    let title: string

    if (params) {
        title = (params.navBarConfig && params.navBarConfig.navBarTitle) ? params.navBarConfig.navBarTitle : params.title 
    } else {
        title = dictTitle
    }

    return title
}