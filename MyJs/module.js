/**
 * @param  {返回url查询参数处理后的对象} args
 */
function getQueryArgs() {
    let qs = location.search.length > 0 ? location.search.substring(1) : '';
    items = qs.length ? qs.split('&') : [];
    args = {},
        item = null,
        name = null,
        value = null,
        i = 0;
    len = items.length;
    for (let i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
/**
 * @param  {form字段组成的键值对对象，值不能是数组}obj
 */

function serializeObjUrl(obj) {
    let url = '?';
    for (let item in obj) {
        url += item + '=' + obj[item] + '&';
    }
    url = url.slice(0, url.length - 1);
    console.log(url);
    return url;
}

module.export = {
    getQueryArgs,serializeObjUrl
}