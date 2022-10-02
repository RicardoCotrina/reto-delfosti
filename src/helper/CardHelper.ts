import { Constants } from "../util/constans/Constants";

export const CardHelper = {
  validateTimeForCardExistence: (createAt: string): boolean => {
    const setTimeInMinutesForDeleteCard = Constants.timeInMinutesForDeleteCard;

    const timeActually = new Date();
    const timeCreate = createAt;

    const timeActuallyInMilliseconds = timeActually.getTime();
    const timeCreateInMilliseconds = new Date(timeCreate).getTime();

    const diffBetweenTime = (timeActuallyInMilliseconds - timeCreateInMilliseconds) / 1000 / 60;

    return diffBetweenTime >= setTimeInMinutesForDeleteCard;
  },
  validateCardNumber: (cardNumber: number): boolean => {
    let isValidCardNumber = true;
    const lengthCardNumber = cardNumber.toString().length;
    if (lengthCardNumber < 13 || lengthCardNumber > 16) {
      return false;
    }

    return CardHelper.validateCardWithLuhn(cardNumber);
  },
  validateCodeCVV: (codeCVV: number): boolean => {
    let isValidCVV = true;
    const minValue = Constants.minValueCVV;
    const maxValue = Constants.maxValueCVV;

    if (codeCVV < minValue || codeCVV > maxValue) {
      isValidCVV = false;
    }

    return isValidCVV;
  },
  validateMonth: (month: string): boolean => {
    const arrayValidateNumbers = Constants.validMonths;
    const lengthMonth = month.length;
    let isValidMonth = true;

    if (lengthMonth !== 2 || !arrayValidateNumbers.includes(month)) {
      return false;
    }
    return isValidMonth;
  },
  validateYear: (year: string): boolean => {
    let isValidYear = true;

    const dateNow = new Date();
    const actuallyYear = Number(dateNow.getFullYear());

    const lengthYear = year.length;
    const numberYear = Number(year);

    const differenceYears = actuallyYear - numberYear;

    if (lengthYear !== 4 || differenceYears > 5) {
      isValidYear = false;
    }
    return isValidYear;
  },
  validateEmail: (email: string): boolean => {
    if (email.includes("@gmail.com") || email.includes("@hotmail.com") || email.includes("@yahoo.es")) return true;
    return false;
  },
  validateCardWithLuhn: (cardNumber: number): boolean => {
    let isValidCardNumber = true;

    const stringCardNumber = cardNumber.toString();

    let arrayDigitsCardNumber = stringCardNumber.split("");
    arrayDigitsCardNumber = arrayDigitsCardNumber.reverse();

    let parseIntArrayDigitsCardNumber = [];
    let totalAmount = 0;

    arrayDigitsCardNumber = arrayDigitsCardNumber.map((digit, index) => {
      let digitNumber = Number(digit);
      if (index % 2 !== 0) {
        digitNumber = digitNumber * 2;
        if (digitNumber > 9) {
          digitNumber = parseInt(String(digitNumber).charAt(0)) + parseInt(String(digitNumber).charAt(1));
        }
      }
      return digitNumber.toString();
    });

    parseIntArrayDigitsCardNumber = arrayDigitsCardNumber.map((digit) => {
      return parseInt(digit);
    });

    totalAmount = parseIntArrayDigitsCardNumber.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });

    totalAmount = totalAmount % 10;

    if (totalAmount !== 0) {
      isValidCardNumber = false;
    }

    return isValidCardNumber;
  },
};
