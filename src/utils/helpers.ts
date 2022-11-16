export const queryToObject = (query: string): object => {
    const queryArray = query.replace('?', '').split('&');
    const queryObject: any = {};

    queryArray.forEach((item) => {
        const splitted = item.split('=');
        const key: string = splitted[0];
        queryObject[key] = splitted[1];
    });

    return queryObject;
};

export const other = () => {};
