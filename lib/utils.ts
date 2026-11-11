export const categoryMenuList = [
  {
    id: 1,
    title: "500-piece puzzles",
    caption: "Easy evenings",
    href: "/shop/500-piece-puzzles",
    color: "bg-[#f8e6d6] text-[#a75e3f]",
  },
  {
    id: 2,
    title: "1000-piece puzzles",
    caption: "A little more challenge",
    href: "/shop/1000-piece-puzzles",
    color: "bg-[#e2eadc] text-[#49634c]",
  },
  {
    id: 3,
    title: "For children",
    caption: "Little puzzlers welcome",
    href: "/shop/kids-puzzles",
    color: "bg-[#f6e8ac] text-[#967326]",
  },
  {
    id: 4,
    title: "Nature & wildlife",
    caption: "Bring the outdoors in",
    href: "/shop/nature-puzzles",
    color: "bg-[#dce9e7] text-[#3f6c68]",
  },
  {
    id: 5,
    title: "British scenes",
    caption: "Somewhere familiar",
    href: "/shop/british-scenes",
    color: "bg-[#eadfee] text-[#735b7c]",
  },
  {
    id: 6,
    title: "Family favourites",
    caption: "Made for sharing",
    href: "/shop/family-puzzles",
    color: "bg-[#e8e4d7] text-[#6c6250]",
  },
];

export const incentives = [
  {
    name: "Find your scene",
    description: "Explore cosy cottages, open countryside, wildlife, and more.",
    imageSrc: "/puzzle-dales.svg",
  },
  {
    name: "Choose your challenge",
    description: "Pick the piece count that feels just right for your day.",
    imageSrc: "/puzzle-garden.svg",
  },
  {
    name: "Make time to unwind",
    description: "Settle in, find the edge pieces, and enjoy the moment.",
    imageSrc: "/puzzle-woodland.svg",
  },
];

export const navigation = {
  sale: [
    { name: "Shop all puzzles", href: "/shop" },
    { name: "500-piece puzzles", href: "/shop/500-piece-puzzles" },
    { name: "1000-piece puzzles", href: "/shop/1000-piece-puzzles" },
  ],
  about: [
    { name: "Our story", href: "/" },
    { name: "Nature & wildlife", href: "/shop/nature-puzzles" },
    { name: "British scenes", href: "/shop/british-scenes" },
  ],
  buy: [
    { name: "Family favourites", href: "/shop/family-puzzles" },
    { name: "Puzzles for children", href: "/shop/kids-puzzles" },
    { name: "Nature & wildlife", href: "/shop/nature-puzzles" },
  ],
  help: [
    { name: "Shop all puzzles", href: "/shop" },
    { name: "My account", href: "/login" },
    { name: "Shopping basket", href: "/cart" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");
  
  // Check if the cleaned input has valid length (13-19 digits)
  if (!/^\d{13,19}$/.test(cleanedInput)) {
    return false;
  }
  
  // Implement Luhn algorithm for credit card validation
  return luhnCheck(cleanedInput);
};

/**
 * Luhn algorithm implementation for credit card validation
 * @param cardNumber - The credit card number as a string
 * @returns boolean - true if the card number is valid according to Luhn algorithm
 */
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  
  // Process digits from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Enhanced credit card validation with card type detection
 * @param input - The credit card number as a string
 * @returns object with validation result and card type
 */
export const validateCreditCard = (input: string) => {
  const cleanedInput = input.replace(/[^0-9]/g, "");
  
  // Basic length and format check
  if (!/^\d{13,19}$/.test(cleanedInput)) {
    return {
      isValid: false,
      cardType: 'unknown',
      error: 'Invalid card number format'
    };
  }
  
  // Luhn algorithm check
  if (!luhnCheck(cleanedInput)) {
    return {
      isValid: false,
      cardType: 'unknown',
      error: 'Invalid card number (Luhn check failed)'
    };
  }
  
  // Detect card type based on BIN (Bank Identification Number)
  const cardType = detectCardType(cleanedInput);
  
  return {
    isValid: true,
    cardType,
    error: null
  };
};

/**
 * Detect credit card type based on BIN patterns
 * @param cardNumber - The credit card number as a string
 * @returns string - The detected card type
 */
const detectCardType = (cardNumber: string): string => {
  const firstDigit = cardNumber[0];
  const firstTwoDigits = cardNumber.substring(0, 2);
  const firstFourDigits = cardNumber.substring(0, 4);
  const firstThreeDigits = cardNumber.substring(0, 3);
  
  // Visa: starts with 4
  if (firstDigit === '4') {
    return 'visa';
  }
  
  // Mastercard: starts with 5 or 2
  if (firstDigit === '5' || (firstTwoDigits >= '22' && firstTwoDigits <= '27')) {
    return 'mastercard';
  }
  
  // American Express: starts with 34 or 37
  if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    return 'amex';
  }
  
  // Discover: starts with 6011, 65, or 644-649
  if (firstFourDigits === '6011' || firstTwoDigits === '65' || 
      (firstThreeDigits >= '644' && firstThreeDigits <= '649')) {
    return 'discover';
  }
  
  // Diners Club: starts with 300-305, 36, or 38
  if ((firstThreeDigits >= '300' && firstThreeDigits <= '305') || 
      firstTwoDigits === '36' || firstTwoDigits === '38') {
    return 'diners';
  }
  
  // JCB: starts with 35
  if (firstTwoDigits === '35') {
    return 'jcb';
  }
  
  return 'unknown';
};

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
