export async function post(path, body, token = null) {
    const res = await fetch(`/api/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Token: token })
        },
        body: JSON.stringify(body),
    });
    return res;
}

export async function get(path, token = null, queryParams = {}) {
    const query = new URLSearchParams(queryParams).toString();
    const url = `/api/${path}${query ? `?${query}` : ""}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            ...(token && { Token: token }),
        },
    });
    return res;
}

export async function put(path, body, token = null) {
    const res = await fetch(`/api/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Token: token }),

        },
        body: JSON.stringify(body),
    });
    return res;
}

export const del = async (path, token) => {
    return await fetch(`/api/${path}`, {
        method: "DELETE",
        headers: {
            ...(token && { Token: token }),
        }
    });
};

export async function postForm(url, formData, token) {
    const res = await fetch(`https://localhost:61830/api/${url}`, {
        method: "POST",
        headers: {
            Token: token
        },
        body: formData
    });
    return res;
}