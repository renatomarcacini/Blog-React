export default class Util{
    convertToShortDate(date) {
        let shortDate = new Date(date).toLocaleDateString();
        return shortDate;
    }
}
