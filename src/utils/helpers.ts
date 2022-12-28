import { CategoryType, FlatCategoryType } from 'types/catalog';

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
