import { CategoryType, FilterCategoryType, FlatCategoryType } from 'types/catalog';

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

export const getSearchParamsFromObject = (data: { [key: string]: any }): string => {
    let params = '?';

    Object.keys(data).forEach((key) => {
        const value = data[key]; // extract, value
        if (value) {
            params += `${key}=${value}&`;
        }
    });

    return params;
};

export const other = () => {};

export const getCategoriesFlat = (categories: CategoryType[]): FlatCategoryType[] => {
    let toReturn: FlatCategoryType[] = [];

    const flatCat = (cat: CategoryType, level: number): FlatCategoryType => ({
        id: cat.id,
        name: cat.name,
        title: cat.title,
        description: cat.description,
        hasChildren: Boolean(cat?.children?.length),
        level
    });

    const flatChild = (cat: CategoryType, level: number) => {
        const father = flatCat(cat, level);

        toReturn = [...toReturn, father];

        if (cat.children) {
            cat.children.forEach((itemB) => {
                flatChild(itemB, level + 1);
            });
        }
    };

    categories.forEach((itemA) => {
        flatChild(itemA, 1);
    });

    return toReturn;
};

export const categoriesFlat = (categories: CategoryType[]): FilterCategoryType[] => {
    const flat: FilterCategoryType[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < categories.length; i++) {
        flat.push({ id: categories[i]?.id, name: categories[i]?.name });
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < categories[i]?.children?.length; j++) {
            flat.push({ id: categories[i].children[j]?.id, name: categories[i].children[j]?.name, fatherName: categories[i]?.name });
            // eslint-disable-next-line no-plusplus
            for (let k = 0; k < categories[i]?.children[j]?.children?.length; k++) {
                flat.push({
                    id: categories[i].children[j].children[k]?.id,
                    name: categories[i].children[j].children[k]?.name,
                    grandFatherName: categories[i]?.name,
                    fatherName: categories[i].children[j]?.name
                });
            }
        }
    }

    return flat;
};

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 4) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function hexIsLight(color: string) {
    const hex = color.replace('#', '');

    const cr = parseInt(hex.substring(0, 2), 16);
    const cg = parseInt(hex.substring(2, 4), 16);
    const cb = parseInt(hex.substring(4, 6), 16);

    const brightness = (cr * 299 + cg * 587 + cb * 114) / 1000;

    return brightness > 150;
}

export const generateRandomString = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i += 1) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
};
