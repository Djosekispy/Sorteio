function generateRandomDigits(): string {
    let randomDigits: string = '';

    for (let i = 0; i < 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10); 
        randomDigits += randomDigit;
    }

    return randomDigits;
}

export const randomDigits = generateRandomDigits();
