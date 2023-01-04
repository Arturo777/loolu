export default function formatUrl(text: string) {
    return text
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
