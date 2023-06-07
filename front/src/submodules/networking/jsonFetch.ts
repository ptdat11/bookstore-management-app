export type APIMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export const jsonFetch = async (
    url: string,
    method?: APIMethod,
    data?: any,
    headers?: HeadersInit
): Promise<Response> => {
    url = url.endsWith("/") ? url : url + '/';
    let trueUrl = url + ((method === "GET" && data != undefined && data != null) ?
        `?${new URLSearchParams(data).toString()}` :
        ""
    );

    let response = await fetch(trueUrl, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            ...headers
        },
        body: (method !== "GET") ? JSON.stringify(data) : undefined,
        mode: "cors",
        credentials: "same-origin"
    })

    return response;
}