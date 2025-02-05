import { generateRandomString,CharacterSetType,Capitalisation } from "ts-randomstring/lib"


export class generateRandomValues {

     generateRandomName(): string {
        const randomString = generateRandomString({
            length: 10,
            charSetType: CharacterSetType.Alphabetic,
            capitalisation: Capitalisation.Lowercase
        });
        return randomString;
      }

       generateRandomNumber(): string {
        const randomNumber = generateRandomString({
            length: 10,
            charSetType: CharacterSetType.Numeric,
        });
        return randomNumber;
      }

}