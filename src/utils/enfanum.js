const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function toPersianNumbers(num) {
    return String(num).replace(/\d/g, (digit) => persianDigits[digit]);
}

export function toEnglishNumbers(num) {
    return String(num).replace(/[۰-۹]/g, (digit) => englishDigits['۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)]);
}
