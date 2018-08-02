export function  getQueryStringParams() {
    let params, a, b;
    let c = {};
    params = window.location.search;

    if(!params) {
        return {}
    }

    params = params.replace("?", "");

    a = params.split("&");

    for(let i=0; i<a.length; i++) {
        b = a[i].split("=");
        c[b[0]] = {"original": b[1], "decoded":decodeURIComponent(b[1])};
    }

    return c;
}
