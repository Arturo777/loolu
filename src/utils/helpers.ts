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

    // console.log(toReturn);

    return toReturn;
};

export const categoriesFlat = (categories: CategoryType[]): FilterCategoryType[] => {
    const flat: FilterCategoryType[] = [];
    console.log(categories);
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
